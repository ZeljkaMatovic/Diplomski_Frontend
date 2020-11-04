import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllratingsComponent } from './allratings.component';

describe('AllratingsComponent', () => {
  let component: AllratingsComponent;
  let fixture: ComponentFixture<AllratingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllratingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllratingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
