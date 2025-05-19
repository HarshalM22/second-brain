"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const schema_1 = require("./schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("./config");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// @ts-ignore
app.post("/api/v1/second-brain/sign-up", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parseResult = schema_1.SignUpSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                error: parseResult.error.format(),
            });
        }
        const { email, password, username } = parseResult.data;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 4);
            const user = yield prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });
            res.status(200).json({ message: "User has been signed up." });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error while signing up" });
        }
    });
});
// @ts-ignore
app.post("/api/v1/second-brain/login", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parseResult = schema_1.LoginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                error: parseResult.error.format(),
            });
        }
        const { username, password } = parseResult.data;
        try {
            const user = yield prisma.user.findUnique({
                where: { username },
            });
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET);
            res.status(200).json({ token });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: "Server error" });
        }
    });
});
app.post("/api/v1/second-brain/create-post", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, link, userId, type } = req.body;
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (user) {
                const content = yield prisma.content.create({
                    data: {
                        title: title,
                        type: type,
                        link: link,
                        userId: userId,
                    },
                });
            }
            res.json({
                message: " content is uplaoded",
            });
        }
        catch (e) {
            res.json({
                message: "app.ts issue",
                error: e,
            });
        }
    });
});
app.get("/api/v1/second-brain/posts", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const posts = yield prisma.content.findMany({
            where: {
                userId: userId,
            },
        });
        res.json({
            posts,
        });
    });
});
app.delete("/api/v1/second-brain/delete-post", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, id } = req.body;
        try {
            const deletedContent = yield prisma.content.delete({
                where: {
                    id: id,
                    userId: userId,
                },
            });
            if (deletedContent) {
                res.status(200).json({
                    message: "deleted successfully",
                });
            }
            else {
                res.json({
                    mesaage: "Not deleted",
                });
            }
        }
        catch (e) {
            res.json({
                message: "error",
                e,
            });
        }
    });
});
app.post("/api/v1/second-brain/share", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const share = req.body.share;
        if (share) {
            yield prisma.link.create({
                data: {
                    userId: req.body.userId,
                    hash: (0, utils_1.random)(10),
                },
            });
        }
        else {
            yield prisma.link.deleteMany({
                where: {
                    userId: req.body.userId,
                },
            });
        }
        res.json({
            message: "updated sharable link",
        });
    });
});
app.get("/api/v1/brain/:shareLink", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = req.params.shareLink;
        const link = yield prisma.link.findUnique({
            where: {
                hash,
            },
        });
        if (!link) {
            res.status(411).json({
                message: "Sorry incorrect input",
            });
            return;
        }
        const content = yield prisma.content.findFirst({
            where: {
                userId: link.userId,
            },
        });
        const user = yield prisma.user.findUnique({
            where: {
                id: link.userId,
            },
        });
        res.json({
            username: user === null || user === void 0 ? void 0 : user.username,
            content: content,
        });
    });
});
const port = 3001;
app.listen(port);
