import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  // styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() buttonBack = true;

  constructor(private _navCtrl: NavController) {}

  goToFavoritePage() {
    this._navCtrl.navigateForward('folder/favorite');
  }

  goBack() {
    this._navCtrl.back();
  }
}
