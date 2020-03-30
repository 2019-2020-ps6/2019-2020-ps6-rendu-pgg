import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauQuizComponent } from './nouveau-quiz.component';

describe('NouveauQuizComponent', () => {
  let component: NouveauQuizComponent;
  let fixture: ComponentFixture<NouveauQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
