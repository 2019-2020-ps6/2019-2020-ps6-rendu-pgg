import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionUserComponent } from './selection-user.component';

describe('SelectionUserComponent', () => {
  let component: SelectionUserComponent;
  let fixture: ComponentFixture<SelectionUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
