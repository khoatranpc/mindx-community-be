import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './graphql/user/user.module';
import { AuthModule } from './global/auth/auth.module';
import { CourseModule } from './graphql/course/course.module';
import { MentorModule } from './graphql/mentor/mentor.module';


@Module({
  imports: [
    PassportModule,
    UserModule,
    AuthModule,
    CourseModule,
    MentorModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      formatError(formattedError) {
        if (formattedError.message === 'Unauthorized') {
          return {
            message: 'Session login has expired!' ?? 'Unknown error, check me, please!',
            statusCode: 401
          }
        }
        return {
          message: formattedError.message ?? 'Unknown error, check me, please!',
          statusCode: formattedError.extensions?.statusCode ?? 500
        }
      },
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
