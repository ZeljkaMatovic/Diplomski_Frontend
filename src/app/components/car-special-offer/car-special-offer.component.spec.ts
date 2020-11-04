import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSpecialOfferComponent } from './car-special-offer.component';

describe('CarSpecialOfferComponent', () => {
  let component: CarSpecialOfferComponent;
  let fixture: ComponentFixture<CarSpecialOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarSpecialOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSpecialOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
