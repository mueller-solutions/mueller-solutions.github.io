import { describe, expect, it } from 'vitest';
import blogService from '../blog.service';

describe('Blog Service', () => {
  it('should get posts', async () => {
    const response = await blogService.getPosts();
    expect(response).toBeDefined();
  });
});
