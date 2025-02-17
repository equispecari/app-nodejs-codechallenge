import { KafkaModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AntiFraudController } from './anti-fraud.controller';
import { AntiFraudService } from './anti-fraud.service';
import { TRANSACTION_SERVICE } from './constans/service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        KAFKA_URI: Joi.string().required(),
        KAFKA_ANTI_FRAUD_CONSUMER: Joi.string().required(),
        KAFKA_TRANSACTION_CONSUMER: Joi.string().required(),
      }),
      envFilePath: './apps/anti-fraud/.env',
    }),
    KafkaModule,
    KafkaModule.register({ name: TRANSACTION_SERVICE }),
  ],
  controllers: [AntiFraudController],
  providers: [AntiFraudService],
})
export class AntiFraudModule {}
