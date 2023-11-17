import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { RedisService } from './redis/redis.service';
import { QueueTopics } from './types';

@Injectable()
export class QueueConsumer implements OnModuleInit {
  private queue: Queue;
  constructor(@Inject('RedisQueue') private redis: RedisService) {
    this.queue = this.redis.getBullQueueInstance('BullQueue-sub');
  }

  async onModuleInit() {
    const workers = Array.from({ length: 1 }, () =>
      this.redis.getBullWorkerInstance('BullQueue-main', async (job: Job) => {
        return await this.handleJob(job);
      }),
    );

    workers.forEach((worker) => {
      worker.on('completed', (job: Job, result: any) => {
        console.log(`---->> Job completed: ${job.id}, result ${result}`);
      });

      worker.on('failed', async (job, err) => {
        if (job.attemptsMade < 3) {
          console.log(`Retrying job ${job.id}, attempt ${job.attemptsMade}`);
          await job.retry();
        } else {
          console.log(`Job ${job.id} reached max retries, marking as failed`);
          job.discard();
        }
        console.error(`---->> Job failed: ${job.name}, error: ${err}`);
      });
    });
  }

  private async handleJob(job: Job) {
    switch (job.name) {
      case QueueTopics.TEST_TOPIC:
        return this.testConsumer(job.data);
    }
  }

  testConsumer(data: any) {
    console.log(data);
    return 'ok';
  }
}
