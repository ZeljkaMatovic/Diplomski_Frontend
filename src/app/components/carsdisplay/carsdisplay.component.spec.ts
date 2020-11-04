import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsdisplayComponent } from './carsdisplay.component';

describe('CarsdisplayComponent', () => {
  let component: CarsdisplayComponent;
  let fixture: ComponentFixture<CarsdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
