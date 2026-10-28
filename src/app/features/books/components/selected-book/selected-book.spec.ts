import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBook } from './selected-book';

describe('SelectedBook', () => {
  let component: SelectedBook;
  let fixture: ComponentFixture<SelectedBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedBook],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
