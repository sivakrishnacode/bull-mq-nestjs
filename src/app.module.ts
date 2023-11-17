import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './queue/queue.module';
import { QueueProducer } from './queue/queue.producer';

@Module({
  imports: [QueueModule],
  controllers: [AppController],
  providers: [AppService, QueueProducer],
})
export class AppModule {}
