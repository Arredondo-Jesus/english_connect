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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database2_1 = __importDefault(require("../database2"));
const admin = __importStar(require("firebase-admin"));
const environment_1 = require("../environment");
var app = admin.initializeApp({
    credential: admin.credential.cert(environment_1.environment.firebase),
    databaseURL: "https://english-connect-64693.firebaseio.com"
});
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield database2_1.default.query(`SELECT * FROM user WHERE status = 'active'`);
            res.json(courses);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const course = yield database2_1.default.query('SELECT * FROM user WHERE id = ?', [id]);
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
            yield database2_1.default.query(`UPDATE user SET status = ? WHERE id = ?`, [req.body.status, id]);
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
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            yield app.auth().getUserByEmail(email)
                .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully fetched user data:', userRecord.toJSON());
            })
                .catch(function (error) {
                console.log('Error fetching user data:', error);
            });
        });
    }
    disableUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            yield app.auth().updateUser(uid, {
                disabled: true
            })
                .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully updated user', userRecord.toJSON());
            })
                .catch(function (error) {
                console.log('Error updating user:', error);
            });
        });
    }
    enableUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            yield app.auth().updateUser(uid, {
                disabled: false
            })
                .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully updated user', userRecord.toJSON());
            })
                .catch(function (error) {
                console.log('Error updating user:', error);
            });
        });
    }
}
exports.userController = new UserController();
