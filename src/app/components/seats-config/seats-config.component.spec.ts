import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsConfigComponent } from './seats-config.component';

describe('SeatsConfigComponent', () => {
  let component: SeatsConfigComponent;
  let fixture: ComponentFixture<SeatsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
