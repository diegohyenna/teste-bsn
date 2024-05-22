import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@NgModule({
  imports: [CommonModule, IonicModule, HttpClientModule],
  providers: [ApiService],
})
export class CommonServicesModule {}
