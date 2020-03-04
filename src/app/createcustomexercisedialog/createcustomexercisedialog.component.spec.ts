import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecustomexercisedialogComponent } from './createcustomexercisedialog.component';

describe('CreatecustomexercisedialogComponent', () => {
  let component: CreatecustomexercisedialogComponent;
  let fixture: ComponentFixture<CreatecustomexercisedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecustomexercisedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecustomexercisedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
