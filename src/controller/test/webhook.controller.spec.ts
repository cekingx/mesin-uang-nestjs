import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../../service/logger.service';
import { PositionUtil } from '../../util/position.util';
import { TradeService } from '../../service/trade.service';
import { WebhookController } from '../webhook.controller';

const mockTradeService = {};
const mockLogService = {};
const mockPositionUtil = {};

describe('WebhookController', () => {
  let controller: WebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        { provide: TradeService, useValue: mockTradeService },
        { provide: LoggerService, useValue: mockLogService },
        { provide: PositionUtil, useValue: mockPositionUtil },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
