import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucksComponent } from './bucks.component';

describe('BucksComponent', () => {
  let component: BucksComponent;
  let fixture: ComponentFixture<BucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
