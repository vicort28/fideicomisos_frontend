import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarSeguroVidaComponent } from './actualizar-seguro-vida.component';

describe('ActualizarSeguroVidaComponent', () => {
  let component: ActualizarSeguroVidaComponent;
  let fixture: ComponentFixture<ActualizarSeguroVidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarSeguroVidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarSeguroVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
