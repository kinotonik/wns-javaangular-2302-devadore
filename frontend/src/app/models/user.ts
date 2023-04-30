import {Role} from "./role";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password : string;
  avatar: string;
  birthdate : Date;
  role : Role;
  score:number;



  constructor(id: number, firstname: string, lastname: string, email: string,password : string, avatar: string, birthdate : Date, role : Role, score:number) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.birthdate = birthdate;
    this.role = role;
    this.score = score;
  }
}
