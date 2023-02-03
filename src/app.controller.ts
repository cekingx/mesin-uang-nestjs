import { Body, Controller, Get, Post } from '@nestjs/common';
import { TradingViewWebhook } from './class/webhook';
import { TradeService } from './service/trade.service';

@Controller()
export class AppController {
  constructor(private tradeService: TradeService) {}

  @Get()
  getHealth() {
    return 'oke';
  }

  @Post()
  getHello(@Body() body: any) {
    console.log(body);
    return 'Oke';
  }

  @Post('/test-trade')
  async testTrade() {
    const result = await this.tradeService.makeTrade({
      strategy: {
        order_action: 'buy',
        order_id: 'long',
      },
    } as TradingViewWebhook);

    return {
      data: result,
    };
  }
}
