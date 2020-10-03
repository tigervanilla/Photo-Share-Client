import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueriesComponent } from './users/queries.component';


const routes: Routes = [
  {path: 'users', component: QueriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
