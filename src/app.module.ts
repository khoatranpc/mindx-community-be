import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserResolver } from './graphql/user/resolver';
import { Collections } from './global/collection';
import { UserSchema } from './graphql/user/schema';
import { UserService } from './graphql/user/service';
import config from '../config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    JwtModule.register({
      global: true,
      secret: 'KHOADEPTRIA',
      signOptions: { expiresIn: '60s' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      formatError(formattedError) {
        return {
          message: formattedError.message ?? 'Unknown error, check me, please!',
          statusCode: (formattedError.extensions?.exception as any)?.statusCode ?? 500
        }
      }
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Collections.USERS,
        schema: UserSchema
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, UserService],
})
export class AppModule { }
