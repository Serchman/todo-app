import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineModalComponent } from './routine-modal.component';

describe('RoutineModalComponent', () => {
  let component: RoutineModalComponent;
  let fixture: ComponentFixture<RoutineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
