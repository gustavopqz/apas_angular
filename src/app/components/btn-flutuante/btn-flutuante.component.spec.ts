import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFlutuanteComponent } from './btn-flutuante.component';

describe('BtnFlutuanteComponent', () => {
  let component: BtnFlutuanteComponent;
  let fixture: ComponentFixture<BtnFlutuanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnFlutuanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnFlutuanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
