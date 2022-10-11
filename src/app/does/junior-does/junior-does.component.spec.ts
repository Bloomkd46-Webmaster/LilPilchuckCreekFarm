import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuniorDoesComponent } from './junior-does.component';

describe('JuniorDoesComponent', () => {
  let component: JuniorDoesComponent;
  let fixture: ComponentFixture<JuniorDoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuniorDoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuniorDoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
