import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarRatingsComponent } from './rentacar-ratings.component';

describe('RentacarRatingsComponent', () => {
  let component: RentacarRatingsComponent;
  let fixture: ComponentFixture<RentacarRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
