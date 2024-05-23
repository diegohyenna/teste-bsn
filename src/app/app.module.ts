import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonServicesModule } from './services/common-services.module';
import { PokemonTypeDirective } from './directives/pokemon-type.directive';
import { CommonDirectivesModule } from './directives/common-directives.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,
    CommonServicesModule,
    CommonDirectivesModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
