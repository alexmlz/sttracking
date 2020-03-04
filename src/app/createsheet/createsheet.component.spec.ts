import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesheetComponent } from './createsheet.component';

describe('CreatesheetComponent', () => {
  let component: CreatesheetComponent;
  let fixture: ComponentFixture<CreatesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
