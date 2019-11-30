import { Router } from 'express';
import {  userController } from '../controllers/userController'

class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', userController.list);
        this.router.get('/:id', userController.getOne);
        this.router.get('/search/:email', userController.getUserByEmail);
        this.router.post('/disable/:uid', userController.disableUser);
        this.router.post('/enable/:uid', userController.enableUser);
        this.router.post('/', userController.create);
        this.router.put('/delete/:id', userController.delete);
        this.router.put('/:id', userController.update);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;