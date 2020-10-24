import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeUserComponent } from './authorize-user/authorize-user.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MutationsComponent } from './mutations/mutations.component';
import { QueriesComponent } from './queries/queries.component';
import { SubscriptionComponent } from './subscription/subscription.component';


const routes: Routes = [
  {path: 'users', component: QueriesComponent},
  {path: 'addFakeUsers',  component: MutationsComponent},
  {path: 'authorize', component: AuthorizeUserComponent},
  {path: 'fileUpload', component: FileUploadComponent},
  {path: 'subscription', component: SubscriptionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
