import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Apollo } from 'apollo-angular';
import { GraphQLModule } from './GraphQL/graphql.module';
import { QueriesComponent } from './queries/queries.component';
import { MutationsComponent } from './mutations/mutations.component';
import { AuthorizeUserComponent } from './authorize-user/authorize-user.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    QueriesComponent,
    MutationsComponent,
    AuthorizeUserComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
  ],
  providers: [Apollo],
  bootstrap: [AppComponent]
})
export class AppModule { }
