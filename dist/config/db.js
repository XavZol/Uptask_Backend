"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const node_process_1 = require("node:process");
// Source - https://stackoverflow.com/a/79892633
// Posted by Xoosk
// Retrieved 2026-02-28, License - CC BY-SA 4.0
const promises_1 = require("node:dns/promises");
(0, promises_1.setServers)(["1.1.1.1", "8.8.8.8"]);
const connectDB = async () => {
    try {
        const { connection } = await mongoose_1.default.connect(process.env.DATABASE_URL);
        const url = `${connection.host}:${connection.port}`;
        console.log(colors_1.default.magenta.bold(`MongoDB Conectado en: ${url}`));
    }
    catch (error) {
        console.log(colors_1.default.red.bold('Error al conectar a MongoDB'));
        console.log(error.message);
        (0, node_process_1.exit)(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map