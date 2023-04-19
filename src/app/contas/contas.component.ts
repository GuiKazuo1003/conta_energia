import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent {
    numPessoas : number ;
    numComodos : number ;
    numTV : number ;
    numPC : number ;
    numKW : number ;
    numConta : number ;
    numChuveiro : number ;
    numTarifa : number ;
    Tarifa : number = 0.65;

    MaqLavar : string;
    Secadora : string;

    //declarações das copias dos valores originais
    tempNumComodos : number;
    tempNumTV : number;
    tempNumPC : number;

    MaqSim : number;
    SecSim : number;

    isCollapsed = true;

    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    }
    
    calcCom(){
      this.numComodos = this.numComodos * 20; //Cada cômodo tem seu próprio gasto dependendo da quantidade de eletrodoméstico em cada cômodo, o valor utilizado foi uma média entre eles
    }
    calcTV(){
      this.numTV = this.numTV * 20; //A TV dependendo do modelo tambem varia o valor do KW, o valor utilizado foi de uma TV de 32 polegadas, 6 horas ligadas
    }
    calcPC(){
      this.numPC = this.numPC * 48; //Aqui a mesma coisa, depende muito de cada computador, a conta utilizada foi 200 Watts (consumo médio) * 8 horas por dia = 1.600 Wh por dia
                                    //1.600 Wh por dia * 30 dias = 48.000 Wh ou 48 kWh por mês
    }
    calcChuveiro(){
      this.numChuveiro = this.numPessoas * 16.50 //em média, 10 minutos de banho daria 0,55 KWs * 30 (média de 1 mês)
    }
    calcKW(){

      // Faça uma cópia dos valores originais
      const tempNumComodos = this.numComodos;
      const tempNumPC = this.numPC;
      const tempNumTV = this.numTV;
      const numPessoas = this.numPessoas;
      const numChuveiro = this.numChuveiro;
      const Tarifa = this.numTarifa;
      const temMaqLavar = this.MaqLavar === 'true' ? 10 : 0; //A conta original seria 400 Watts (consumo médio) * 15 ciclos de lavagem = 6.000 Wh ou 6 kWh por mês.
                                                             //Mas por conta que pode ocorrer mais lavagens do que 1 dia sim e outra não, fora panos, se caso tiver animal em casa, foi aumentado para 10
      const temSecadora = this.Secadora === 'true' ? 60 : 0; //4.000 Watts (consumo médio) * 15 ciclos de secagem = 60.000 Wh ou 60 kWh por mês

      // Chame as funções calcCom(), calcPC() e calcTV() para calcular seus respectivos valores
      this.calcCom();
      this.calcTV();
      this.calcPC();
      this.calcChuveiro();
      
      const numComodos = this.numComodos;
      const numPC = this.numPC;
      const numTV = this.numTV;

      this.numComodos = tempNumComodos;
      this.numTV = tempNumTV;
      this.numPC = tempNumPC;

      this.numChuveiro = this.numPessoas * 16.50;
      
      this.numKW = numPC + numTV + numComodos + ((temMaqLavar + temSecadora) * numPessoas) + numChuveiro;

      this.numConta = this.numKW * this.Tarifa;
      this.numConta = parseFloat(this.numConta.toFixed(2));
    }
}
