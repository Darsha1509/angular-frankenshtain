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

@NgModule({
  declarations: [AppComponent, SimpleFormComponent, FetchDataComponent, RatingComponent, StarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
