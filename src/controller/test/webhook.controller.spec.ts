import { Test, TestingModule } from '@nestjs/testing';
import { TradeService } from '../../service/trade.service';
import { WebhookController } from '../webhook.controller';

const mockTradeService = {};

describe('WebhookController', () => {
  let controller: WebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [{ provide: TradeService, useValue: mockTradeService }],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
