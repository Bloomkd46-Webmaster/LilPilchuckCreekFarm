import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoesComponent } from './does.component';

describe('DoesComponent', () => {
  let component: DoesComponent;
  let fixture: ComponentFixture<DoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
