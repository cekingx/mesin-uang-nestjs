import { Test, TestingModule } from '@nestjs/testing';
import { TradingViewWebhook } from 'src/class/webhook';
import { Position } from '../../constant/position.constant';
import { PositionUtil } from '../position.util';

describe('PositionUtil', () => {
  let service: PositionUtil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PositionUtil],
    }).compile();

    service = module.get<PositionUtil>(PositionUtil);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should open long position', async () => {
    const webhook: TradingViewWebhook = {
      strategy: {
        order_action: 'buy',
        order_id: 'long',
      },
    } as TradingViewWebhook;

    expect(await service.getPosition(webhook)).toBe(Position.OPEN_LONG);
  });

  it('should close long position', async () => {
    const webhook: TradingViewWebhook = {
      strategy: {
        order_action: 'sell',
        order_id: 'Close entry(s) order long',
      },
    } as TradingViewWebhook;

    expect(await service.getPosition(webhook)).toBe(Position.CLOSE_LONG);
  });

  it('should error', async () => {
    const webhook: TradingViewWebhook = {
      strategy: {
        order_action: '',
        order_id: '',
      },
    } as TradingViewWebhook;

    expect(await service.getPosition(webhook)).toBeInstanceOf(Error);
  });
});
