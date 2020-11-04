import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRentacarComponent } from './edit-rentacar.component';

describe('EditRentacarComponent', () => {
  let component: EditRentacarComponent;
  let fixture: ComponentFixture<EditRentacarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRentacarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRentacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
