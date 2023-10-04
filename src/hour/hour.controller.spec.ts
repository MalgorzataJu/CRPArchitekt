import { Test, TestingModule } from '@nestjs/testing';
import { HourController } from './hour.controller';

describe('HourController', () => {
  let controller: HourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HourController],
    }).compile();

    controller = module.get<HourController>(HourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
