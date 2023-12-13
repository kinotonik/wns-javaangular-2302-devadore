import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactComponent} from './contact.component';
import {LogoComponent} from "../../../shared/logo/logo.component";
import {MatCardModule} from "@angular/material/card";

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent, LogoComponent],
      imports: [MatCardModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
