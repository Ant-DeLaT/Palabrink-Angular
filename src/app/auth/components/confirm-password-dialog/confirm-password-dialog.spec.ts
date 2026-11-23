import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPasswordDialog } from './confirm-password-dialog';

describe('ConfirmPasswordDialog', () => {
  let component: ConfirmPasswordDialog;
  let fixture: ComponentFixture<ConfirmPasswordDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPasswordDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmPasswordDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
