import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatCardComponent } from './goat-card.component';

describe('GoatCardComponent', () => {
  let component: GoatCardComponent;
  let fixture: ComponentFixture<GoatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoatCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
