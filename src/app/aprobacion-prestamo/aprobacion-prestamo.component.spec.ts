import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionPrestamoComponent } from './aprobacion-prestamo.component';

describe('AprobacionPrestamoComponent', () => {
  let component: AprobacionPrestamoComponent;
  let fixture: ComponentFixture<AprobacionPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionPrestamoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobacionPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
