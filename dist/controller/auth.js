"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT = process.env.JWT_SECRET;
async function register(req, res) {
    try {
        const { email, password } = req.body;
        const checkUser = await prisma_1.default.user.findUnique({
            where: { email: email }
        });
        if (checkUser) {
            return res.status(404).json({
                message: "Email Udah Terdaftar"
            });
        }
        const hashPass = await bcryptjs_1.default.hash(password, 10);
        const newUser = await prisma_1.default.user.create({
            data: {
                email: email,
                password: hashPass
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, JWT);
        res.status(200).json({
            message: "Register Berhasil",
            data: {
                user: newUser,
                token
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err instanceof Error ? err.message : "An unknown error occurred"
        });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const findEmail = await prisma_1.default.user.findUnique({
            where: { email: email }
        });
        if (!findEmail) {
            return res.status(404).json({
                message: "Email Tidak Ditemukan"
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, findEmail.password);
        if (!isMatch) {
            return res.status(403).json({
                message: "Password Salah"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: findEmail.id,
            email: findEmail.email
        }, JWT);
        res.status(200).json({
            message: "Login Berhasil",
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
}
//# sourceMappingURL=auth.js.map