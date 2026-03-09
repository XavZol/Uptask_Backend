"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ProjectController_1 = require("../controllers/ProjectController");
const validation_1 = require("../middleware/validation");
const TaskController_1 = require("../controllers/TaskController");
const project_1 = require("../middleware/project");
const task_1 = require("../middleware/task");
const auth_1 = require("../middleware/auth");
const TeamController_1 = require("../controllers/TeamController");
const NoteController_1 = require("../controllers/NoteController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.post('/', // 1. Primero verificamos el token
(0, express_validator_1.body)('projectName') // 2. Validamos los datos
    .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'), (0, express_validator_1.body)('clientName')
    .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La Descripción del Proyecto es Obligatorio'), validation_1.handleInputErrors, // 3. Revisamos si alguna validación falló
ProjectController_1.ProjectController.createProject // 4. Finalmente, ejecutamos el controlador
);
router.get('/', ProjectController_1.ProjectController.getAllProjects);
router.get('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('ID No válido'), validation_1.handleInputErrors, ProjectController_1.ProjectController.getProjectById);
router.put('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('ID No válido'), (0, express_validator_1.body)('projectName')
    .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'), (0, express_validator_1.body)('clientName')
    .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La Descripción del Proyecto es Obligatorio'), validation_1.handleInputErrors, ProjectController_1.ProjectController.updatedProject);
router.delete('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('ID No válido'), validation_1.handleInputErrors, ProjectController_1.ProjectController.deleteProject);
/**Routes for tasks */
router.param('projectId', project_1.projectExists);
router.post('/:projectId/tasks', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El Nombre de la Tarea es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La Descripción de la Tarea es Obligatoria'), validation_1.handleInputErrors, TaskController_1.TaskController.createTask);
router.get('/:projectId/tasks', TaskController_1.TaskController.getProjectTasks);
router.param('taskId', task_1.taskExists);
router.param('taskId', task_1.taskBelongsToProject);
router.get('/:projectId/tasks/:taskId', (0, express_validator_1.param)('taskId').isMongoId().withMessage('ID No válido'), validation_1.handleInputErrors, TaskController_1.TaskController.getTaskById);
router.get('/:projectId/tasks', TaskController_1.TaskController.getProjectTasks);
router.put('/:projectId/tasks/:taskId', task_1.hasAutorization, (0, express_validator_1.param)('taskId').isMongoId().withMessage('ID No válido'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El Nombre de la Tarea es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La Descripción de la Tarea es Obligatoria'), validation_1.handleInputErrors, TaskController_1.TaskController.updateTask);
router.delete('/:projectId/tasks/:taskId', task_1.hasAutorization, (0, express_validator_1.param)('taskId').isMongoId().withMessage('ID No válido'), validation_1.handleInputErrors, TaskController_1.TaskController.deleteTask);
router.put('/:projectId/tasks/:taskId/status', (0, express_validator_1.param)('taskId').isMongoId().withMessage('ID No válido'), (0, express_validator_1.body)('status')
    .notEmpty().withMessage('El estado es obligatorio'), validation_1.handleInputErrors, TaskController_1.TaskController.updateStatus);
/** Routes for teams */
router.post('/:projectId/team/find', (0, express_validator_1.body)('email')
    .isEmail().toLowerCase().withMessage('E-mail no válido'), validation_1.handleInputErrors, TeamController_1.TeamMemberController.findMemberByEmail);
router.get('/:projectId/team', TeamController_1.TeamMemberController.getProjectTeam);
router.post('/:projectId/team', (0, express_validator_1.body)('id')
    .isMongoId().withMessage('ID No válido'), validation_1.handleInputErrors, TeamController_1.TeamMemberController.addMemberById);
router.delete('/:projectId/team/:userId', (0, express_validator_1.param)('userId')
    .isMongoId().withMessage('ID No válido'), validation_1.handleInputErrors, TeamController_1.TeamMemberController.removeMemberById);
/** Routes for Notes */
router.post('/:projectId/tasks/:taskId/notes', (0, express_validator_1.body)('content')
    .notEmpty().withMessage('El contenido es obligatorio'), validation_1.handleInputErrors, NoteController_1.NoteController.createNote);
router.get('/:projectId/tasks/:taskId/notes', NoteController_1.NoteController.getTaskNotes);
router.delete('/:projectId/tasks/:taskId/notes/:noteId', (0, express_validator_1.param)('noteId')
    .isMongoId().withMessage('ID No válido'), validation_1.handleInputErrors, NoteController_1.NoteController.deleteNote);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map