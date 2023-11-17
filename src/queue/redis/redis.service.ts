import { Injectable } from '@nestjs/common';
import { Job, Processor, Queue, Worker } from 'bullmq';

@Injectable()
export class RedisService {
  constructor(
    private readonly host: string,
    private readonly port: number,
  ) {
    this.host = host;
    this.port = port;
  }

  public getBullQueueInstance(queueName: string): Queue {
    return new Queue(queueName, {
      connection: {
        host: this.host,
        port: this.port,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
        priority: 1,
      },
    });
  }

  public getBullWorkerInstance(queueName: string, callback: Processor): Worker {
    return new Worker(queueName, callback, {
      connection: {
        host: this.host,
        port: this.port,
      },
    });
  }
}
