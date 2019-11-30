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

    public async getUserByEmail(req: Request, res: Response) {
        const { email } = req.params;
        await app.auth().getUserByEmail(email)
            .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully fetched user data:', userRecord.toJSON());
        })
        .catch(function(error) {
            console.log('Error fetching user data:', error);
        });
    }

    public async disableUser(req: Request, res: Response) {
        const { uid } = req.params;
        await app.auth().updateUser(uid, {
            disabled: true
          })
            .then(function(userRecord) {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully updated user', userRecord.toJSON());
            })
            .catch(function(error) {
              console.log('Error updating user:', error);
            });
    }

    public async enableUser(req: Request, res: Response) {
        const { uid } = req.params;
        await app.auth().updateUser(uid, {
            disabled: false
          })
            .then(function(userRecord) {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully updated user', userRecord.toJSON());
            })
            .catch(function(error) {
              console.log('Error updating user:', error);
            });
    }
}

export const userController = new UserController();
