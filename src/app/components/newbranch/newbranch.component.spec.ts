import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbranchComponent } from './newbranch.component';

describe('NewbranchComponent', () => {
  let component: NewbranchComponent;
  let fixture: ComponentFixture<NewbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
