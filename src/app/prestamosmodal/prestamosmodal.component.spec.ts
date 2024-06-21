import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosmodalComponent } from './prestamosmodal.component';

describe('PrestamosmodalComponent', () => {
  let component: PrestamosmodalComponent;
  let fixture: ComponentFixture<PrestamosmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamosmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestamosmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
