import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMeSnackBarComponent } from './login-me-snack-bar.component';

describe('LoginMeSnackBarComponent', () => {
  let component: LoginMeSnackBarComponent;
  let fixture: ComponentFixture<LoginMeSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMeSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMeSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
