import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfriendComponent } from './newfriend.component';

describe('NewfriendComponent', () => {
  let component: NewfriendComponent;
  let fixture: ComponentFixture<NewfriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewfriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
