import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarprofileComponent } from './carprofile.component';

describe('CarprofileComponent', () => {
  let component: CarprofileComponent;
  let fixture: ComponentFixture<CarprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
