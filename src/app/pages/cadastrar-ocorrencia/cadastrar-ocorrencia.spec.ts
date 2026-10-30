import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarOcorrencia } from './cadastrar-ocorrencia';

describe('CadastrarOcorrencia', () => {
  let component: CadastrarOcorrencia;
  let fixture: ComponentFixture<CadastrarOcorrencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarOcorrencia],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarOcorrencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
