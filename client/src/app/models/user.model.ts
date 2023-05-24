import {Role} from "./role.model";


export interface User {
  id: number;
  username: string;
  email: string;
  password : string;
  avatar: string;
  score:number;
  roles : Role[];
  createdAt: Date;
  updatedAt: Date;
}
