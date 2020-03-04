import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateexercisedialogComponent } from './createexercisedialog.component';

describe('CreateexercisedialogComponent', () => {
  let component: CreateexercisedialogComponent;
  let fixture: ComponentFixture<CreateexercisedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateexercisedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateexercisedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
