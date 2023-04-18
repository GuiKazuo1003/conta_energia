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
      this.numComodos = this.numComodos * 15;
    }
    calcTV(){
      this.numTV = this.numTV * 20;
    }
    calcPC(){
      this.numPC = this.numPC * 50;
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
      const temMaqLavar = this.MaqLavar === 'true' ? 10 : 0;
      const temSecadora = this.Secadora === 'true' ? 15 : 0;

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

      this.numConta = this.numKW * 0.75; //mais ou menos o valor de 1 KWs
      this.numConta = parseFloat(this.numConta.toFixed(2));
    }
}
