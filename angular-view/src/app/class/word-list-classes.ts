import { Word } from '../../../../express-server/src/shared/word';

export class SeletionInfo {
  word: Word;
  mode: RowSelectionMode;

  constructor(word: Word, mode: RowSelectionMode) {
    this.word = word;
    this.mode = mode;
  }
}
export enum RowSelectionMode {
  Add = 0,
  Edit = 1,
  Delete = 2
}
export enum RowDisplayMode {
  View = 0,
  Disabled = 1,
  Add = 2,
  Edit = 3,
  Delete = 4
}
export class ConfirmData {
  mode: RowSelectionMode;
  word: Word;
  done: () => void;

  constructor(mode: RowSelectionMode, word: Word, done: () => void = () => { }) {
    this.mode = mode;
    this.word = word;
    this.done = done;
  }
}