// worker.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisService } from './redis/redis.service';
import { QueueTopics } from './types';

@Injectable()
export class QueueProducer {
  private queue: Queue;
  constructor(@Inject('RedisQueue') private redis: RedisService) {
    this.queue = this.redis.getBullQueueInstance('BullQueue-main');
  }

  testConsumer(data: any) {
    this.queue.add(QueueTopics.TEST_TOPIC, data);
  }
}
