import { Test, TestingModule } from '@nestjs/testing';
import { DistinctTokensService } from './../src/tokens/distinct-tokens.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DistinctToken } from './../src/tokens/distinct-token.entity';

describe('DistinctTokensService', () => {
  let service: DistinctTokensService;
  const repo = {
    findOne: jest.fn(),
    create: jest.fn((x) => x),
    save: jest.fn(async (x) => ({ id: '1', createdAt: new Date(), ...x })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistinctTokensService,
        { provide: getRepositoryToken(DistinctToken), useValue: repo },
      ],
    }).compile();

    service = module.get(DistinctTokensService);
    jest.clearAllMocks();
  });

  it('saves a new symbol', async () => {
    repo.findOne.mockResolvedValue(null);
    const result = await service.addIfNew({ symbol: 'btc' });
    expect(repo.save).toHaveBeenCalled();
    expect(result?.symbol).toBe('BTC');
  });

  it('skips existing symbol', async () => {
    repo.findOne.mockResolvedValue({ id: '1', symbol: 'BTC' });
    await service.addIfNew({ symbol: 'BTC' });
    expect(repo.save).not.toHaveBeenCalled();
  });
});
