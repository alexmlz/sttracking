import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StfooterComponent } from './stfooter.component';

describe('StfooterComponent', () => {
  let component: StfooterComponent;
  let fixture: ComponentFixture<StfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
