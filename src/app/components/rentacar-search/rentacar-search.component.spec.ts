import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarSearchComponent } from './rentacar-search.component';

describe('RentacarSearchComponent', () => {
  let component: RentacarSearchComponent;
  let fixture: ComponentFixture<RentacarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
