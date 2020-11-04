import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsetterComponent } from './discountsetter.component';

describe('DiscountsetterComponent', () => {
  let component: DiscountsetterComponent;
  let fixture: ComponentFixture<DiscountsetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountsetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountsetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
