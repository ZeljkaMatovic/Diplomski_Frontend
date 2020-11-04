import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCarComponent } from './quick-car.component';

describe('QuickCarComponent', () => {
  let component: QuickCarComponent;
  let fixture: ComponentFixture<QuickCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
