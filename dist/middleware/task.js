"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskExists = taskExists;
exports.taskBelongsToProject = taskBelongsToProject;
exports.hasAutorization = hasAutorization;
const Task_1 = __importDefault(require("../models/Task"));
async function taskExists(req, res, next) {
    try {
        const { taskId } = req.params;
        const task = await Task_1.default.findById(taskId);
        if (!task) {
            const error = new Error('Tarea No Encontrada');
            return res.status(404).json({ error: error.message });
        }
        req.task = task;
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Hubo un error' });
    }
}
function taskBelongsToProject(req, res, next) {
    if (req.user._id.toString() !== req.project.manager.toString()) {
        const error = new Error('Acción no válida');
        return res.status(400).json({ error: error.message });
    }
    req.task = req.task; // ültimo cambio 
    next();
}
function hasAutorization(req, res, next) {
    if (String(req.task.project) !== String(req.project._id.toString())) {
        const error = new Error('Acción no válida');
        return res.status(400).json({ error: error.message });
    }
    req.task = req.task; // ültimo cambio 
    next();
}
//# sourceMappingURL=task.js.map