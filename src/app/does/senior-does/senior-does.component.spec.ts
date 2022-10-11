import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorDoesComponent } from './senior-does.component';

describe('SeniorDoesComponent', () => {
  let component: SeniorDoesComponent;
  let fixture: ComponentFixture<SeniorDoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeniorDoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeniorDoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
