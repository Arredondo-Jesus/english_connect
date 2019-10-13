"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
class StudentRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', studentController_1.studentController.list);
        this.router.get('/:id', studentController_1.studentController.getOne);
        this.router.post('/', studentController_1.studentController.create);
        this.router.put('/delete/:id', studentController_1.studentController.delete);
        this.router.put('/:id', studentController_1.studentController.update);
    }
}
const studentRoutes = new StudentRoutes();
exports.default = studentRoutes.router;
