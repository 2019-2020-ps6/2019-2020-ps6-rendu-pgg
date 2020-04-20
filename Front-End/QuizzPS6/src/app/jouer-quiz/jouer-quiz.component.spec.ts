import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JouerQuizComponent } from './jouer-quiz.component';

describe('JouerQuizComponent', () => {
  let component: JouerQuizComponent;
  let fixture: ComponentFixture<JouerQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JouerQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JouerQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
