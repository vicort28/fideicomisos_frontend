import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRegistrosComponent } from './eliminar-registros.component';

describe('EliminarRegistrosComponent', () => {
  let component: EliminarRegistrosComponent;
  let fixture: ComponentFixture<EliminarRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarRegistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
