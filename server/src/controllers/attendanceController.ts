import {Request , Response} from 'express';
import pool from '../database';

class AttendanceController {

    public async list (req: Request, res: Response){
        const attendance = await pool.query('SELECT * FROM attendance');
        res.json(attendance);
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const attendance = await pool.query('SELECT * FROM attendance WHERE id = ?', [id]);

        if (attendance.length > 0){
            return res.json(attendance[0]);
        }

        res.status(404).json(res.json({text: 'Record was not found'}));
    }

    public async create (req: Request, res: Response): Promise <void>{
        await pool.query('INSERT INTO attendance set ?', [req.body]);
        res.json({message: 'Record saved'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM attendance WHERE id = ?', [id]);
        res.json({text: 'Record ' + id + ' was deleted successfully'});
    }

    public async update (req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE attendance SET ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Record ' + id + ' was updated successfully'});
    }
}

export const attendanceController = new AttendanceController();
