import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpromotionsComponent } from './carpromotions.component';

describe('CarpromotionsComponent', () => {
  let component: CarpromotionsComponent;
  let fixture: ComponentFixture<CarpromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
