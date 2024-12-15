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
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    const filePath = path_1.default.join(__dirname, '..', '..', 'front-end', 'index.html');
    // const filePath2 = __dirname + "../../fornt-end/index.html"
    res.sendFile(filePath);
    // res.json({
    //   message : filePath,
    //   message2: filePath2
    // })
    // res.sendFile(__dirname + "../../fornt-end/index.html")
});
// @ts-ignore
app.post('/second-brain/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                password: password
            }
        });
        res.json({
            message: "user has been sign up "
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            message: " error while signing up"
        });
    }
}));
app.post('/second-brain/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const find = yield prisma.user.findUnique({
            where: {
                username: username,
                password: password
            }
        });
        if (find) {
            const token = jsonwebtoken_1.default.sign({
                username: username
            }, JWT_SECRET);
            res.json({
                token: token
            });
        }
        else {
            res.json({
                message: "user not found "
            });
        }
    }
    catch (e) {
        res.json({
            message: " error while loging in "
        });
    }
}));
app.get("/second-brain", (req, res) => {
    const filePath = path_1.default.join(__dirname, '..', 'index.html');
    res.sendFile(filePath);
    console.log(filePath);
    console.log(__dirname);
    console.log(__filename);
});
const port = 3001;
app.listen(port);
