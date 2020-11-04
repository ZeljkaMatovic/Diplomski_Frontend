import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveFlightComponent } from './reserve-flight.component';

describe('ReserveFlightComponent', () => {
  let component: ReserveFlightComponent;
  let fixture: ComponentFixture<ReserveFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
