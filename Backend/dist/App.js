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
const JWT_SECRET = "harshal";
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// @ts-ignore
app.post("/api/v1/second-brain/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const user = yield prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password,
            },
        });
        res.status(200).json({
            message: "user has been sign up ",
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            message: " error while signing up",
        });
    }
}));
app.post("/api/v1/second-brain/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, username } = req.body;
    try {
        const find = yield prisma.user.findUnique({
            where: {
                username: username,
                password: password,
            },
        });
        if (find) {
            const token = jsonwebtoken_1.default.sign({
                userId: find.id,
            }, JWT_SECRET);
            res.status(200).json({
                token: token,
            });
        }
        else {
            res.json({
                message: "user not found ",
            });
        }
    }
    catch (e) {
        res.json({
            message: e,
        });
    }
}));
app.get("/api/v1/second-brain/me", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.userId;
        try {
            const constent = yield prisma.content.findMany({
                where: {
                    userId: userId,
                },
            });
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (constent) {
                res.json({
                    constent: constent,
                    user: user,
                });
            }
        }
        catch (e) {
            res.json({
                msg: "error",
                e,
            });
        }
    });
});
// @ts-ignore
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
                userId: userId
            }
        });
        res.json({
            posts
        });
    });
});
// @ts-ignore
app.delete("/api/v1/second-brain/delete-post", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, id } = req.body;
        console.log(userId, id);
        try {
            const deletedContent = yield prisma.content.delete({
                where: {
                    id: id,
                    userId: userId,
                }
            });
            if (deletedContent) {
                res.status(200).json({
                    message: "deleted successfully"
                });
            }
            else {
                res.json({
                    mesaage: "Not deleted"
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
                hash
            }
        });
        if (!link) {
            res.status(411).json({
                message: "Sorry incorrect input"
            });
            return;
        }
        const content = yield prisma.content.findFirst({
            where: {
                userId: link.userId
            }
        });
        const user = yield prisma.user.findUnique({
            where: {
                id: link.userId
            }
        });
        res.json({
            username: user === null || user === void 0 ? void 0 : user.username,
            content: content
        });
    });
});
const port = 3000;
app.listen(port);
