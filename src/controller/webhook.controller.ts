import { Body, Controller, Post } from '@nestjs/common';
import { TradingViewWebhook } from 'src/class/webhook';
import { TradeService } from 'src/service/trade.service';

@Controller('webhook')
export class WebhookController {
  constructor(private tradeService: TradeService) {}

  @Post('bybit')
  async handleBybit(@Body() body: TradingViewWebhook) {
    const result = await this.tradeService.makeTrade(body);
    return result;
  }
}
