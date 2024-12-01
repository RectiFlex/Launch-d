import { createServer } from 'http';
import { createYoga } from 'graphql-yoga';
import { schema } from '../src/lib/graphql/schema';

const yoga = createYoga({ schema });
const server = createServer(yoga);

export default server;