import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingComponent } from './rating/rating.component';
import { StarComponent } from './star/star.component';
import { InjectionTokenComponent } from './injection-token/injection-token.component';
import { Component1NtComponent } from './component1-nt/component1-nt.component';
import { Component2NtComponent } from './component2-nt/component2-nt.component';
import { DATA_STORAGE } from './data-storage.injection-token';
import { DataStorage } from './service1-it.service';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleFormComponent,
    FetchDataComponent,
    RatingComponent,
    StarComponent,
    InjectionTokenComponent,
    Component1NtComponent,
    Component2NtComponent,
    AddUserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: DATA_STORAGE,
      useClass: DataStorage,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
