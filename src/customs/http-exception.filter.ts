import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Obj } from 'src/global/inteface';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const getResponse = exception.response as Obj;

    return new GraphQLError(getResponse?.message && Array.isArray(getResponse.message) ? (getResponse?.message as string[])?.join('<br />') : exception.message, {
      extensions: {
        ...exception.extensions,
        statusCode: getResponse?.statusCode ?? exception.extensions?.statusCode ?? 500,
      }
    });
  }
}