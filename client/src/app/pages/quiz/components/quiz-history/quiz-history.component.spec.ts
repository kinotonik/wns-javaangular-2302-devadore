import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizHistoryComponent } from './quiz-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('QuizHistoryComponent', () => {
  let component: QuizHistoryComponent;
  let fixture: ComponentFixture<QuizHistoryComponent>;

  const activatedRouteStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizHistoryComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ 
        { provide: ActivatedRoute, useValue: activatedRouteStub } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
