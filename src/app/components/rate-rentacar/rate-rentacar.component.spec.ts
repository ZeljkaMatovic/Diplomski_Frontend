import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateRentacarComponent } from './rate-rentacar.component';

describe('RateRentacarComponent', () => {
  let component: RateRentacarComponent;
  let fixture: ComponentFixture<RateRentacarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateRentacarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateRentacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
