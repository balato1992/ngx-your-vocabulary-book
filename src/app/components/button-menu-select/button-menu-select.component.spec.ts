import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMenuSelectComponent } from './button-menu-select.component';

describe('ButtonMenuSelectComponent', () => {
  let component: ButtonMenuSelectComponent;
  let fixture: ComponentFixture<ButtonMenuSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonMenuSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMenuSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
