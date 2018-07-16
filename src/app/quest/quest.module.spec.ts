import { QuestModule } from './quest.module';

describe('QuestModule', () => {
  let questModule: QuestModule;

  beforeEach(() => {
    questModule = new QuestModule();
  });

  it('should create an instance', () => {
    expect(questModule).toBeTruthy();
  });
});
