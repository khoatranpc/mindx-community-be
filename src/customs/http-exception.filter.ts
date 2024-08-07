import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        const response = {
            statusCode: exception.response?.statusCode ?? 500,
            message: exception.response?.message.join(', ') ?? exception.message ?? 'Internal server error!',
            exception
        }
        return new GraphQLError(response.message, {
            extensions: {
                code: 'BAD_REQUEST',
                exception: response,
                message: response.message
            },
        });
    }
}