import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [InfiniteScrollComponent],
  exports: [InfiniteScrollComponent, FormsModule],
})
export class CommonComponentsModule {}
