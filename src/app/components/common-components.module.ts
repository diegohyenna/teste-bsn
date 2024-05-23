import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [InfiniteScrollComponent, HeaderComponent],
  exports: [InfiniteScrollComponent, HeaderComponent, FormsModule],
})
export class CommonComponentsModule {}
