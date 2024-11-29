import { describe, it, expect } from 'vitest';
import tokenService from '../token.service';

describe('TokenService', () => {
  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });
});
