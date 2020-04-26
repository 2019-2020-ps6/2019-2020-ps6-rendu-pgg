import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresQuizComponent } from './parametres-quiz.component';

describe('ParametresQuizComponent', () => {
  let component: ParametresQuizComponent;
  let fixture: ComponentFixture<ParametresQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametresQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
