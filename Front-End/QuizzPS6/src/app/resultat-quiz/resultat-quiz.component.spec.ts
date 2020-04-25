import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatQuizComponent } from './resultat-quiz.component';

describe('ResultatQuizComponent', () => {
  let component: ResultatQuizComponent;
  let fixture: ComponentFixture<ResultatQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
