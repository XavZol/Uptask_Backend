"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No Autorizado');
        return res.status(401).json({ error: error.message });
    }
    const [, token] = bearer.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded._id) {
            const user = await User_1.default.findById(decoded._id).select('_id name email');
            if (user) {
                req.user = user;
                return next();
            }
            else {
                return res.status(500).json({ error: 'Token No Válido' });
            }
        }
        else {
            return res.status(500).json({ error: 'Token No Válido' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Token No Válido' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map