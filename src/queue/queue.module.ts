import { Module } from '@nestjs/common';
import { QueueConsumer } from './queue.consumer';
import { RedisModule } from './redis/redis.module';
import { QueueProducer } from './queue.producer';

@Module({
  providers: [QueueConsumer, QueueProducer],
  imports: [
    RedisModule.register({
      host: 'localhost',
      port: 6379,
    }),
  ],
})
export class QueueModule {}
