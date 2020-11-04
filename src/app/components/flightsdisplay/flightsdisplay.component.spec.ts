import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsdisplayComponent } from './flightsdisplay.component';

describe('FlightsdisplayComponent', () => {
  let component: FlightsdisplayComponent;
  let fixture: ComponentFixture<FlightsdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
