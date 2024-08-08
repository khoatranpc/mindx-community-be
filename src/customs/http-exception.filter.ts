import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { GraphqlException } from './GraphqlException';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: GraphqlException, host: ArgumentsHost) {

    return new GraphQLError(exception.message, {
      extensions: exception.extendtions
    });
  }
}