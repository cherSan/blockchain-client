import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';

import { ApolloAngularSDK } from "./graph-ql.service";

const uri = '/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const http = httpLink.create({
    uri
  });

  const ws = new WebSocketLink({
    uri: `ws://localhost:3000${uri}`,
    options:{
      reconnect:true
    }
  });

  const link = split(
    ({query}) => {
      const data = getMainDefinition(query);
      return (
        data.kind === 'OperationDefinition' && data.operation === 'subscription'
      );
    },
    ws,
    http
  )

  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    ApolloAngularSDK
  ]
})
export class GraphQlClientModule {}
