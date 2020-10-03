import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Apollo } from 'apollo-angular';
import { GraphQLModule } from './GraphQL/graphql.module';
import { QueriesComponent } from './users/queries.component';

@NgModule({
  declarations: [
    AppComponent,
    QueriesComponent
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
