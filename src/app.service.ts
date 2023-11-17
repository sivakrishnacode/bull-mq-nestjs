import { Injectable } from '@nestjs/common';
import { QueueProducer } from './queue/queue.producer';

@Injectable()
export class AppService {
  constructor(private readonly redis: QueueProducer) {}

  getHello() {
    this.redis.testConsumer({
      data: 'test data from queue',
    });
    return 'Hello World!';
  }
}
