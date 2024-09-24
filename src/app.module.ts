import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { UserModule } from 'src/modules/user/user.module';
import { StreamModule } from 'src/modules/stream/stream.module';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
import { JsonModule } from './modules/json/json.module';
import { BlogsModule } from './modules/blogs/blogs.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    StreamModule,
    JsonModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
