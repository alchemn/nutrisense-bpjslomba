"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const analyze_1 = __importDefault(require("./routes/analyze"));
const auth_1 = __importDefault(require("./routes/auth"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("src/uploads"));
app.use("/api", analyze_1.default);
app.use("/api/auth", auth_1.default);
app.get("/", (_, res) => {
    res.send("Nutrisense JKN Hore");
});
app.listen(port, () => {
    console.log(`Server Running On http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map