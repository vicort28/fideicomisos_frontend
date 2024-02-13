import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnacelarregistroComponent } from './cnacelarregistro.component';

describe('CnacelarregistroComponent', () => {
  let component: CnacelarregistroComponent;
  let fixture: ComponentFixture<CnacelarregistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnacelarregistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnacelarregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
