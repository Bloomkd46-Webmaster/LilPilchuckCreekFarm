import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdgaInfoComponent } from './adga-info.component';

describe('AdgaInfoComponent', () => {
  let component: AdgaInfoComponent;
  let fixture: ComponentFixture<AdgaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdgaInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdgaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
