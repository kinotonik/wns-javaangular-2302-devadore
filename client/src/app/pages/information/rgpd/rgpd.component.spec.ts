import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RgpdComponent} from './rgpd.component';
import {LogoComponent} from "../../../shared/logo/logo.component";

describe('RgpdComponent', () => {
  let component: RgpdComponent;
  let fixture: ComponentFixture<RgpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RgpdComponent, LogoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RgpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
