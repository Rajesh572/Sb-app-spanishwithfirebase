import { Component, OnInit } from '@angular/core';
import {NavController,ModalController} from 'ionic-angular'

@Component({
  selector: 'app-modalcomponent',
  templateUrl: './modalcomponent.component.html',
})
export class ModalcomponentComponent implements OnInit {

  constructor(private navCtrl:NavController,
    private modalCtrl:ModalController) { }

  ngOnInit() {}

  action() {
    console.log('consoled');
    }

}
