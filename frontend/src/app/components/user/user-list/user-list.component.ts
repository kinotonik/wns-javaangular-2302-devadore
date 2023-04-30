import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";


@Component({
  selector: 'app-user',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  users?: User[];


  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data)
    });
  }

}
