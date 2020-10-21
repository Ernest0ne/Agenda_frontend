import { Component, OnInit, HostListener } from '@angular/core';
import { AppComponent } from '../../app.component';
import * as SecureLS from 'secure-ls';
import { FuncionesGenerales } from '../../../app/demo/Components/FuncionesGenerales/funcionesGenerales';
import { DasboardService } from '../Services/dasboard.service';
import { Svg } from '../svgPath/svg';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  templateUrl: './emptydemo.component.html',
  providers: [FuncionesGenerales, MessageService]
})
export class EmptyDemoComponent implements OnInit {
  ls = new SecureLS({ encodingType: 'aes' });

  widthScreen = 0;
  msgs: Message[] = [];
  dataConteiner: any;

  constructor(
    public svg: Svg,
    public funcionesGenerales: FuncionesGenerales,
    public dasboardService: DasboardService,
    private app: AppComponent,
    private funciones: AppComponent,

  ) {
  }

  ngOnInit() {
    this.app.chargeBreadcrum('', null);
    this.app.setTitleMobile('INICIO');
    this.funciones.mostarMenu();
    this.dataConteiner = this.svg.returnMain();
  }



}
