import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesectionsheetComponent } from './createsectionsheet.component';

describe('CreatesectionsheetComponent', () => {
  let component: CreatesectionsheetComponent;
  let fixture: ComponentFixture<CreatesectionsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesectionsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesectionsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
