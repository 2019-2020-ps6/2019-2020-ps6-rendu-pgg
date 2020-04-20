import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionThemeComponent } from './selection-theme.component';

describe('SelectionThemeComponent', () => {
  let component: SelectionThemeComponent;
  let fixture: ComponentFixture<SelectionThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
