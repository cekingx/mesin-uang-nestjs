import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookController } from './controller/webhook.controller';
import { TradeService } from './service/trade.service';
import { PositionUtil } from './util/position.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [AppController, WebhookController],
  providers: [AppService, TradeService, PositionUtil],
})
export class AppModule {}
