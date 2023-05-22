import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSaleGoatComponent } from './for-sale-goat.component';

describe('ForSaleGoatComponent', () => {
  let component: ForSaleGoatComponent;
  let fixture: ComponentFixture<ForSaleGoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForSaleGoatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForSaleGoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
