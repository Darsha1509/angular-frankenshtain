import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpleFormComponent } from './simple-form/simple-form.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

const routes: Routes = [
  { path: 'simple-form', component: SimpleFormComponent },
  { path: 'fetch-data', component: FetchDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
