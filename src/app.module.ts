import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SpotsModule } from './spots/spots.module';
import { ContactsModule } from './contacts/contacts.module';
import { readFileSync } from 'fs';
import getPass from './aws-sdk';

const pem = './global-bundle.pem'
const password = getPass() as unknown as string | undefined

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any, // "mysql"
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,
      password: password,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: false,
      ssl : true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
           ca: readFileSync(pem).toString(),
        }
      },
      logging: 'all',
      logger: 'advanced-console',
    }
  ),
    AuthModule,
    UsersModule,
    SpotsModule,
    ContactsModule
  ],
})
export class AppModule {}
