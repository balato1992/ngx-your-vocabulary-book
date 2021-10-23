import { Word } from '../../../../express-server/src/shared/word';
import { WordForView } from './word-for-view';

describe('WordForView', () => {
  it('should create an instance', () => {
    expect(new WordForView(new Word())).toBeTruthy();
  });
});
