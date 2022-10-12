import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiddingScheduleComponent } from './kidding-schedule.component';

describe('KiddingScheduleComponent', () => {
  let component: KiddingScheduleComponent;
  let fixture: ComponentFixture<KiddingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KiddingScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KiddingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
