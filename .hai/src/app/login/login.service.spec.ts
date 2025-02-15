/**
 * Test suite for the LoginService
 * This file contains unit tests for the LoginService functionality
 */

import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  /**
   * Set up before each test
   * Configures the testing module and injects the LoginService
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  /**
   * Test case to verify that the service is created successfully
   * Ensures that the LoginService is properly instantiated
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});