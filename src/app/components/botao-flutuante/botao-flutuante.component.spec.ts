import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoFlutuanteComponent } from './botao-flutuante.component';

describe('BotaoFlutuanteComponent', () => {
  let component: BotaoFlutuanteComponent;
  let fixture: ComponentFixture<BotaoFlutuanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoFlutuanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotaoFlutuanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
