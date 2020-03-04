import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectiondetailsComponent } from './sectiondetails.component';

describe('SectiondetailsComponent', () => {
  let component: SectiondetailsComponent;
  let fixture: ComponentFixture<SectiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
