import { Body, Controller, Post } from '@nestjs/common';
import { TradingViewWebhook } from '../class/webhook';
import { TradeService } from '../service/trade.service';

@Controller('webhook')
export class WebhookController {
  constructor(private tradeService: TradeService) {}

  @Post('bybit')
  async handleBybit(@Body() body: TradingViewWebhook) {
    const result = await this.tradeService.makeTrade(body);
    return result;
  }
}
