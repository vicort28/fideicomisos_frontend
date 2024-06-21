import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprobarPrestamoComponent } from './modal-aprobar-prestamo.component';

describe('ModalAprobarPrestamoComponent', () => {
  let component: ModalAprobarPrestamoComponent;
  let fixture: ComponentFixture<ModalAprobarPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAprobarPrestamoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAprobarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
