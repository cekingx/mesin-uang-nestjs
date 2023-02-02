import { Injectable } from '@nestjs/common';
import { TradingViewWebhook } from 'src/class/webhook';
import { Position } from '../constant/position.constant';

@Injectable()
export class PositionUtil {
  async getPosition(webhook: TradingViewWebhook): Promise<Position | Error> {
    const { order_action, order_id } = webhook.strategy;

    if (order_action == 'buy' && order_id == 'long') return Position.OPEN_LONG;
    if (order_action == 'sell' && order_id == 'Close entry(s) order long')
      return Position.CLOSE_LONG;
    if (order_action == 'sell' && order_id == 'short')
      return Position.OPEN_SHORT;
    if (order_action == 'buy' && order_id == 'Close entry(s) order short')
      return Position.CLOSE_SHORT;

    return new Error('Undefined Position');
  }
}
