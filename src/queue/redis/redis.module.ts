import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RedisService } from './redis.service';

type RedisModuleType = {
  host: string;
  port: number;
};

@Module({})
export class RedisModule {
  static register({ host, port }: RedisModuleType): DynamicModule {
    const BullQueue = new RedisService(host, port);

    const BullQueueInstance: Provider = {
      provide: 'RedisQueue',
      useValue: BullQueue,
    };

    return {
      module: RedisModule,
      providers: [BullQueueInstance],
      exports: [BullQueueInstance],
      global: true,
    };
  }
}
