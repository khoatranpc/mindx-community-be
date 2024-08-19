import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './auth.guard';
import { UserModule } from 'src/graphql/user/user.module';
import { CourseModule } from 'src/graphql/course/course.module';
import { MentorModule } from 'src/graphql/mentor/mentor.module';

@Module({
    imports: [
        UserModule,
        CourseModule,
        PassportModule,
        MentorModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('SECRET_KEY'),
                signOptions: { expiresIn: '60m' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtStrategy, GqlAuthGuard],
})
export class AuthModule { }
