import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { split } from 'apollo-link';
import { OperationDefinitionNode } from 'graphql';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
const wsUri = 'ws://localhost:4000/graphql'; // <-- add the URL of subscription websocket here

export function createApollo(httpLink: HttpLink) {
  // add the authorization to the headers
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')
    });
    return forward(operation);
  });

  const wsConnectionLink = new WebSocketLink({
    uri: wsUri,
    reconnect: true,
  });

  const httpConnectonLink: any = ApolloLink.from([authMiddleware, httpLink.create({uri, useMultipart: true })]);

  const linkToUse = split(
    ({query}) => {
      const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsConnectionLink,
    httpConnectonLink,
  );

  return {
    link: linkToUse,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    HttpLink,
  ],
  imports: [HttpClientModule]
})
export class GraphQLModule {}
