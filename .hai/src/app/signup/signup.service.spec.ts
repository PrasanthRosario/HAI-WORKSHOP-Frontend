/**
 * Test suite for the SignupService
 * This file contains unit tests for the SignupService functionality
 */

import { TestBed } from '@angular/core/testing';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let service: SignupService;

  /**
   * Set up before each test
   * Configures the testing module and injects the SignupService
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupService);
  });

  /**
   * Test case to verify that the service is created successfully
   * Ensures that the SignupService instance exists
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});