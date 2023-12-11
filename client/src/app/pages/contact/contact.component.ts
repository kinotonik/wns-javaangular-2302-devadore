import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [MatCardModule, SharedModule],
})
export class ContactComponent {

}
