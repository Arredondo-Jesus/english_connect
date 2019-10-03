"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
class AttendanceRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', attendanceController_1.attendanceController.list);
        this.router.get('/:id', attendanceController_1.attendanceController.getOne);
        this.router.post('/', attendanceController_1.attendanceController.create);
        this.router.delete('/:id', attendanceController_1.attendanceController.delete);
        this.router.put('/:id', attendanceController_1.attendanceController.update);
    }
}
const attendanceRoutes = new AttendanceRoutes();
exports.default = attendanceRoutes.router;
