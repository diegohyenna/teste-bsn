import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonServicesModule } from './services/common-services.module';
import { CommonDirectivesModule } from './directives/common-directives.module';

import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'favorites',
      storeConfig: { keyPath: 'pokemonId', autoIncrement: false },
      storeSchema: [
        { name: 'pokemonId', keypath: 'pokemonId', options: { unique: true } },
        {
          name: 'pokemonName',
          keypath: 'pokemonName',
          options: { unique: true },
        },
      ],
    },
  ],
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicModule.forRoot({ mode: 'md' }),
    NgxIndexedDBModule.forRoot(dbConfig),
    AppRoutingModule,
    CommonServicesModule,
    CommonDirectivesModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
