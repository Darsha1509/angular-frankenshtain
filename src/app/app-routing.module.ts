import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpleFormComponent } from './simple-form/simple-form.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { InjectionTokenComponent } from './injection-token/injection-token.component';

const routes: Routes = [
  { path: 'simple-form', component: SimpleFormComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'injection-token', component: InjectionTokenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
