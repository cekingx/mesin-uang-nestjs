import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PositionUtil } from '../../util/position.util';
import { TradeService } from '../trade.service';

const mockPositionUtil = {};
const mockHttpService = {};
const mockConfigService = {
  get: jest.fn(),
};

describe('TradeService', () => {
  let service: TradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradeService,
        { provide: PositionUtil, useValue: mockPositionUtil },
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<TradeService>(TradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should make signature', async () => {
    mockConfigService.get
      .mockImplementationOnce(() => 'api-key')
      .mockImplementationOnce(() => 'api-secret');
    const signature = await service.makeSignature('');
    expect(signature.length).toBe(64);
  });
});
