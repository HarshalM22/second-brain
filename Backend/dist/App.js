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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
        console.log(user);
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
                username: username,
            }, JWT_SECRET);
            // giving token to the header for dashboard purpose 
            res.header("Token", token);
            res.json({
                token: token
            });
            console.log(token);
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
// @ts-ignore
app.post("/second-brain/create-post", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, link } = req.body;
        console.log(title);
        console.log(description);
        console.log(link);
        const token = req.headers.Token;
        console.log(token);
        const tokenInfo = jsonwebtoken_1.default.verify(`${token}`, JWT_SECRET);
        console.log(tokenInfo);
        // @ts-ignore
        console.log(tokenInfo.username);
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    // @ts-ignore
                    username: tokenInfo.username
                }
            });
            console.log(user === null || user === void 0 ? void 0 : user.id);
            if (user) {
                const content = yield prisma.content.create({
                    data: {
                        title: title,
                        description: description,
                        link: link,
                        userId: user.id
                    }
                });
                res.json({
                    message: " content is uplaoded"
                });
            }
        }
        catch (e) {
            res.json({
                message: "app.ts issue",
                error: e
            });
        }
    });
});
// @ts-ignore
// function auth (req,res,next){
//   const token = req.headers.Token; 
//   const tokenInfo = jwt.verify(token,JWT_SECRET) ;
//   if(tokenInfo){
//     req.username = tokenInfo.username ;
//     next();
//   }else{
//     res.json({
//       MESSAGE : "YOU ARE LOGGED IN "
//     }) ;
//   }
// }
const port = 3001;
app.listen(port);
