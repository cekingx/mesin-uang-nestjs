import { Body, Controller, Post } from '@nestjs/common';
import { LoggerService } from '../service/logger.service';
import { TradingViewWebhook } from '../class/webhook';
import { TradeService } from '../service/trade.service';
import { PositionUtil } from '../util/position.util';
import { WEBHOOK_RECEIVED } from '../message/webhook.message';

@Controller('webhook')
export class WebhookController {
  constructor(
    private tradeService: TradeService,
    private log: LoggerService,
    private positionUtil: PositionUtil,
  ) {}

  @Post('bybit')
  async handleBybit(@Body() body: TradingViewWebhook) {
    this.log.webhook(
      WEBHOOK_RECEIVED(
        await this.positionUtil.getPosition(body),
        body.strategy.order_contracts,
      ),
    );
    const result = await this.tradeService.makeTrade(body);
    return result;
  }
}
