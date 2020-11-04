import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesdisplayComponent } from './airlinesdisplay.component';

describe('AirlinesdisplayComponent', () => {
  let component: AirlinesdisplayComponent;
  let fixture: ComponentFixture<AirlinesdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlinesdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinesdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
