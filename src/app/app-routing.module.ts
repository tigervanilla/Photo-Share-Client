import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeUserComponent } from './authorize-user/authorize-user.component';
import { MutationsComponent } from './mutations/mutations.component';
import { QueriesComponent } from './queries/queries.component';


const routes: Routes = [
  {path: 'users', component: QueriesComponent},
  {path: 'addFakeUsers',  component: MutationsComponent},
  {path: 'authorize', component: AuthorizeUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
