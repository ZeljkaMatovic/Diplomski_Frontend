import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveCarComponent } from './reserve-car.component';

describe('ReserveCarComponent', () => {
  let component: ReserveCarComponent;
  let fixture: ComponentFixture<ReserveCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
