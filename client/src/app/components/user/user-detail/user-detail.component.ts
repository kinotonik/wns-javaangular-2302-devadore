import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../../models/role.model";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  allRoles!: Role[]; // all available roles
  userRoles!: Role[]; // roles of the user

  user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    avatar: '',
    score: 0,
    roles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);

    forkJoin([this.userService.getAllRoles(), this.userService.getUserById(id)])
      .subscribe(([roles, user]) => {
        this.allRoles = roles;
        this.user = user;
        this.userRoles = user.roles;
      });
  }

  loadUser(): void {
    const userId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.userService.getUserById(userId).subscribe(user => {
      this.user = user;
      console.log(user)
    });
  }
  isRoleSelected(role: Role): boolean {
    return this.userRoles?.some(userRole => userRole.id === role.id);
  }

  toggleRoleSelection(role: Role): void {
    const roleIndex = this.userRoles.findIndex(userRole => userRole.id === role.id);

    if (roleIndex !== -1) {
      // Role is already selected, remove it from the userRoles array
      this.userRoles.splice(roleIndex, 1);
    } else {
      // Role is not selected, add it to the userRoles array
      this.userRoles.push(role);
    }
  }
  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe({
      next: () => {
        alert('Profil mis à jour avec succès');
        this.router.navigate(['/user-list']);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil:', error);
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        alert('Profil supprimé avec succès');
        // Redirigez vers une autre page après la suppression du profil
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du profil:', error);
      }
    });
  }
}
