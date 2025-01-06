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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// @ts-ignore
app.post("/second-brain/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, username } = req.body;
    if (!firstName || !lastName || !email || !password || !username) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const user = yield prisma.user.create({
            data: {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            },
        });
        res.json({
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
app.post("/second-brain/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        const find = yield prisma.user.findUnique({
            where: {
                username: username,
                password: password,
                email: email,
            },
        });
        if (find) {
            const token = jsonwebtoken_1.default.sign({
                userId: find.id,
            }, JWT_SECRET);
            res.json({
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
app.get("/me", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.userId;
        try {
            const find = yield prisma.content.findMany({
                where: {
                    userId: userId,
                },
            });
            console.log(find);
            if (find) {
                res.json({
                    find,
                    userId: userId,
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
app.post("/second-brain/create-post", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, link, userId } = req.body;
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
                        description: description,
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
// @ts-ignore
app.get("/userinfo", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.userId;
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            res.json({
                user
            });
        }
        catch (e) {
            res.json({
                message: "error",
                e
            });
        }
    });
});
app.delete("/second-brain/delete-post", middleware_1.auth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.body;
        const title = req.body.title;
        try {
            const find = yield prisma.content.findMany({
                where: {
                    title: title,
                    userId: userId
                }
            });
            const deletePost = yield prisma.content.delete({
                where: {
                    id: find[0].id
                }
            });
            const findAfterDelete = yield prisma.content.findMany({
                where: {
                    userId: userId
                }
            });
            res.json({
                message: "post deleted",
                findAfterDelete
            });
        }
        catch (e) {
            res.json({
                message: "error",
                e
            });
        }
    });
});
const port = 3000;
app.listen(port);
