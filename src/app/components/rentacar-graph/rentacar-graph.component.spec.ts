import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarGraphComponent } from './rentacar-graph.component';

describe('RentacarGraphComponent', () => {
  let component: RentacarGraphComponent;
  let fixture: ComponentFixture<RentacarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
