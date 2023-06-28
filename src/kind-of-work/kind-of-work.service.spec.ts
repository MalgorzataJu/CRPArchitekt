import { Test, TestingModule } from '@nestjs/testing';
import { KindOfWorkService } from './kind-of-work.service';

describe('KindOfWorkService', () => {
  let service: KindOfWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KindOfWorkService],
    }).compile();

    service = module.get<KindOfWorkService>(KindOfWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
