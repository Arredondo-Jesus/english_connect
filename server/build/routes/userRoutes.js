"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', userController_1.userController.list);
        this.router.get('/:id', userController_1.userController.getOne);
        this.router.get('/search/:email', userController_1.userController.getUserByEmail);
        this.router.post('/disable/:uid', userController_1.userController.disableUser);
        this.router.post('/enable/:uid', userController_1.userController.enableUser);
        this.router.post('/', userController_1.userController.create);
        this.router.put('/delete/:id', userController_1.userController.delete);
        this.router.put('/:id', userController_1.userController.update);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
