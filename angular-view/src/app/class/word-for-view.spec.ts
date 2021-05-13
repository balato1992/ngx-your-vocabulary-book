import { Word } from '../../../../common-code/models/word';
import { WordForView } from './word-for-view';

describe('WordForView', () => {
  it('should create an instance', () => {
    expect(new WordForView(new Word())).toBeTruthy();
  });
});
