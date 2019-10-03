import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import courseRoutes from './routes/courseRoutes';
import instructorRoutes from './routes/instructorRoutes';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';


class Server {
    
    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000 );
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    
    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/courses', courseRoutes);
        this.app.use('/api/students', studentRoutes);
        this.app.use('/api/instructors', instructorRoutes);
        this.app.use('/api/attendance', attendanceRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on port ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();