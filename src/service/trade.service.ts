import { Injectable } from '@nestjs/common';
import { TradingViewWebhook } from '../class/webhook';
import { Position } from '../constant/position.constant';
import { PositionUtil } from '../util/position.util';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { ByBitEndpoint } from '../constant/bybit.constant';

@Injectable()
export class TradeService {
  constructor(
    private positionUtil: PositionUtil,
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  async makeTrade(webhook: TradingViewWebhook) {
    const payload = await this.makePayload(webhook);
    const result = await this.makeRequest(payload);
    console.log('result', result);

    return result;
  }

  async makePayload(webhook: TradingViewWebhook) {
    const position = await this.positionUtil.getPosition(webhook);
    if (position instanceof Error) throw position;

    if (position == Position.OPEN_LONG) {
      return {
        symbol: 'BTCUSDT',
        side: 'Buy',
        orderType: 'Market',
        qty: webhook.strategy.order_contracts,
        timeInForce: 'GoodTillCancel',
        reduce_only: false,
      };
    }
    if (position == Position.CLOSE_LONG) {
      return {
        symbol: 'BTCUSDT',
        side: 'Sell',
        orderType: 'Market',
        qty: webhook.strategy.order_contracts,
        timeInForce: 'GoodTillCancel',
        reduce_only: true,
      };
    }
    if (position == Position.OPEN_SHORT) {
      return {
        symbol: 'BTCUSDT',
        side: 'Sell',
        orderType: 'Market',
        qty: webhook.strategy.order_contracts,
        timeInForce: 'GoodTillCancel',
        reduce_only: false,
      };
    }
    if (position == Position.CLOSE_SHORT) {
      return {
        symbol: 'BTCUSDT',
        side: 'Buy',
        orderType: 'Market',
        qty: webhook.strategy.order_contracts,
        timeInForce: 'GoodTillCancel',
        reduce_only: true,
      };
    }
  }

  async makeSignature(parameters: string) {
    const recvWindow = 5000;
    const timestamp = Date.now().toString();
    const apiKey = this.config.get('API_KEY');
    const secret = this.config.get('API_SECRET');
    return crypto
      .createHmac('sha256', secret)
      .update(timestamp + apiKey + recvWindow + parameters)
      .digest('hex');
  }

  async makeRequest(data: Record<string, any>) {
    const url = this.config.get('BYBIT_HOST') + ByBitEndpoint.ORDER;
    const timestamp = Date.now().toString();
    const apiKey = this.config.get('API_KEY');
    const config = {
      headers: {
        'X-BAPI-SIGN-TYPE': '2',
        'X-BAPI-SIGN': await this.makeSignature(JSON.stringify(data)),
        'X-BAPI-API-KEY': apiKey,
        'X-BAPI-TIMESTAMP': timestamp,
        'X-BAPI-RECV-WINDOW': '5000',
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    const { data: result } = await lastValueFrom(
      this.httpService.post(url, data, config),
    );

    return result;
  }
}
