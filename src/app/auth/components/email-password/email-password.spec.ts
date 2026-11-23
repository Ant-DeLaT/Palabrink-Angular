import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPassword } from './email-password';

describe('EmailPassword', () => {
  let component: EmailPassword;
  let fixture: ComponentFixture<EmailPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailPassword],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
