"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(token, JWT, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Token Invalid" });
        req.user = decoded;
        console.log("Authenticated user:", req.user);
        next();
    });
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map