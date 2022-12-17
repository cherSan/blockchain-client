import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { ApolloAngularSDK } from "./graph-ql.service";

const uri = '/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
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
