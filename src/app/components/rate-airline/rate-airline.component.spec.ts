import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAirlineComponent } from './rate-airline.component';

describe('RateAirlineComponent', () => {
  let component: RateAirlineComponent;
  let fixture: ComponentFixture<RateAirlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAirlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
