import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';

// On a besoin de formulaires pour l'application, on importe "FormsModule"
import { FormsModule } from '@angular/forms';
// Communiquer avec les services web et passer des appels HTTP, on importe HttpClientModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // Enregistrés automatiquement lors de la génération des composants
    AppComponent,
    CreateComponent,
    DetailsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
