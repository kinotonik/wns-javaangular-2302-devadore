export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  birthdate : Date;



  constructor(id: number, firstname: string, lastname: string, email: string, avatar: string, birthdate : Date) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.avatar = avatar;
    this.birthdate = birthdate;
  }
}
