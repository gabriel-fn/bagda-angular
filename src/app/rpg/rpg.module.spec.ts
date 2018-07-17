import { RpgModule } from './rpg.module';

describe('RpgModule', () => {
  let rpgModule: RpgModule;

  beforeEach(() => {
    rpgModule = new RpgModule();
  });

  it('should create an instance', () => {
    expect(rpgModule).toBeTruthy();
  });
});
