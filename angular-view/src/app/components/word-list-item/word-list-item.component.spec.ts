import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListItemComponent } from './word-list-item.component';

describe('WordListItemComponent', () => {
  let component: WordListItemComponent;
  let fixture: ComponentFixture<WordListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
