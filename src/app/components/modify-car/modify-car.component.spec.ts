import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCarComponent } from './modify-car.component';

describe('ModifyCarComponent', () => {
  let component: ModifyCarComponent;
  let fixture: ComponentFixture<ModifyCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
