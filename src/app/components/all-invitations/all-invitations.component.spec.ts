import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInvitationsComponent } from './all-invitations.component';

describe('AllInvitationsComponent', () => {
  let component: AllInvitationsComponent;
  let fixture: ComponentFixture<AllInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
