import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { FireBaseUser } from '../models/fireBaseUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.API_URI}/users`);
  }

  getUsersDB() {
    return this.http.get(`${this.API_URI}/users/list`);
  }

  getUserDB(uid: string) {
    return this.http.get(`${this.API_URI}/users/${uid}`);
  }

  saveUser(user: User) {
    return this.http.post(`${this.API_URI}/users`, user);
  }

  deleteUsers(id: string | number, updatedUser: User) {
    return this.http.put(`${this.API_URI}/users/delete/${id}`, updatedUser);
  }

  deleteUsersFirebase(uid: string) {
    return this.http.delete(`${this.API_URI}/users/delete/${uid}`);
  }

  updateUsers(id: string | number, updatedUser: User) {
    return this.http.put(`${this.API_URI}/users/${id}`, updatedUser);
  }

  getUserById(uid: string) {
    return this.http.get(`${this.API_URI}/users/search/${uid}`);
  }

  getUserPermissions(email: string) {
    return this.http.get(`${this.API_URI}/users/permissions/${email}`);
  }

  updateUser(uid: string, updatedUser: FireBaseUser) {
    return this.http.post(`${this.API_URI}/users/update/${uid}`, updatedUser);
  }
}
