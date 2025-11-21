"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_1.login);
authRouter.post('/register', auth_1.register);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map