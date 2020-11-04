import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCardsComponent } from './discount-cards.component';

describe('DiscountCardsComponent', () => {
  let component: DiscountCardsComponent;
  let fixture: ComponentFixture<DiscountCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
