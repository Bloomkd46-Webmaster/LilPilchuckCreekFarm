import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSaleGoatModalComponent } from './for-sale-goat-modal.component';

describe('ForSaleGoatModalComponent', () => {
  let component: ForSaleGoatModalComponent;
  let fixture: ComponentFixture<ForSaleGoatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForSaleGoatModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForSaleGoatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
