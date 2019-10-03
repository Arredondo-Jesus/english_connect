import {Request , Response} from 'express';
import pool from '../database';

class StudentController {

    public async list (req: Request, res: Response){
        const students = await pool.query('SELECT * FROM student');
        res.json(students);
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const course = await pool.query('SELECT * FROM student WHERE id = ?', [id]);

        if (course.length > 0){
            return res.json(course[0]);
        }

        res.status(404).json(res.json({text: 'Student was not found'}));
    }

    public async create (req: Request, res: Response): Promise <void>{
        await pool.query('INSERT INTO student set ?', [req.body]);
        res.json({message: 'Student saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM student WHERE id = ?', [id]);
        res.json({text: 'Student ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE student SET ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Student ' + id + ' was updated successfully'});
    }
}

export const studentController = new StudentController();
