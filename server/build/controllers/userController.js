"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database2_1 = __importDefault(require("../database2"));
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield database2_1.default.query(`SELECT * FROM user`);
            res.json(courses);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const { password } = req.params;
            const course = yield database2_1.default.query('SELECT * FROM user WHERE name = ? AND password = ?', [name, password]);
            if (course.length > 0) {
                return res.json(course[0]);
            }
            res.status(404).json(res.json({ text: 'User was not found' }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database2_1.default.query('INSERT INTO user set ?', [req.body]);
            res.json({ message: 'User saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database2_1.default.query('UPDATE user SET status = ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'User ' + id + ' was deleted successfully' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database2_1.default.query('UPDATE user SET ? WHERE id = ?', [req.body, id]);
            res.json({ text: 'User ' + id + ' was updated successfully' });
        });
    }
}
exports.userController = new UserController();
