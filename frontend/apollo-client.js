import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "{{YOUR BACKEND URL HERE}}",
    cache: new InMemoryCache(),
});

export default client;