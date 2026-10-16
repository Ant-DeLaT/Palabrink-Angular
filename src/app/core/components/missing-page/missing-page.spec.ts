import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPage } from './missing-page';

describe('MissingPage', () => {
  let component: MissingPage;
  let fixture: ComponentFixture<MissingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MissingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
