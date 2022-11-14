import { ApolloServer } from 'apollo-server-cloudflare';
import { graphqlCloudflare } from 'apollo-server-cloudflare/dist/cloudflareApollo';
import { Request, Response } from 'apollo-server-env';

import { dataSources } from './context';
import { playground } from './playground';
import { resolvers } from './resolver';
import { typeDefs } from './schema';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      const response = new Response('', { status: 204 });
      setupCORS(request, response);
      return response;
    }
    try {
      const url = new URL(request.url);
      if (url.pathname === '/graphql') {
        const response = playground();
        return response;
      } else {
        const response = await graphQLServer(request, env);
        setupCORS(request, response);
        return response;
      }
    } catch (e) {
      if (e instanceof Error) {
        const response = new Response(e.message, { status: 500 });
        setupCORS(request, response);
        console.log('Internal Error', e.message);
        return response;
      } else {
        const response = new Response('Unknown Error', { status: 500 });
        setupCORS(request, response);
        console.log('Internal Error', e);
        return response;
      }
    }
  }
};

function setupCORS(request: Request, response: Response) {
  const origin = request.headers.get('Origin');
  if (origin != null) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
}

const createServer = (env: Env) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    dataSources: dataSources(env),
    cache: 'bounded'
  });

const graphQLServer = async (request: Request, env: Env) => {
  const server = createServer(env);
  await server.start();
  return graphqlCloudflare(() => server.createGraphQLServerOptions(request))(
    request
  );
};
