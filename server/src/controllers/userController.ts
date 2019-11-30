import {Request , Response} from 'express';
import pool from '../database2';
import * as admin from 'firebase-admin';
import { environment } from '../environment';

var app = admin.initializeApp({
    credential: admin.credential.cert(environment.firebase),
    databaseURL: "https://english-connect-64693.firebaseio.com"
});

class UserController {

    public async list (req: Request, res: Response){
        const courses = await pool.query(`SELECT * FROM user WHERE status = 'active'`);
        res.json(courses);
    }
    
    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const course = await pool.query('SELECT * FROM user WHERE id = ?', [id]);

        if (course.length > 0){
            return res.json(course[0]);
        }

        res.status(404).json(res.json({text: 'User was not found'}));
    }

    
    public async create (req: Request, res: Response): Promise <void>{
          await pool.query('INSERT INTO user set ?', [req.body]);
          res.json({message: 'User saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query(`UPDATE user SET status = ? WHERE id = ?`, [req.body.status, id]);
        res.json({text: 'User ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE user SET ? WHERE id = ?', [req.body, id]);
        res.json({text: 'User ' + id + ' was updated successfully'});
    }

    public async getUserById(req: Request, res: Response) {
        const { uid } = req.params;
        await app.auth().getUser(uid)
            .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            res.json(JSON.stringify(userRecord));
        })
        .catch((error) => {
            res.json(error);
        });
    }

    public async updateUser(req: Request, res: Response) {
        const { uid } = req.params;
        await app.auth().updateUser(uid, {
            email: req.body.email,
            disabled: req.body.disabled,
            password: req.body.password 
          })
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              res.json(JSON.stringify(userRecord));
            })
            .catch((error) => {
              res.json(error);
            });
    }
    
    public async listAllUsers(req: Request, res: Response) {
      let userList: any = [];  
      // List batch of users, 1000 at a time.
        admin.auth().listUsers(1000)
        .then((listUsersResult)  => {
          listUsersResult.users.forEach((userRecord) => {
            userList.push(userRecord.toJSON());
          });
          console.log(userList);
          res.json(userList);
        })
        .catch(function(error) {
          console.log('Error listing users:', error);
        });
    }
}

export const userController = new UserController();
