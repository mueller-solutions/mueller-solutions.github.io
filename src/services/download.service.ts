import path from 'path';
import tokenServiceInstance from './token.service';

class DownloadService {
  constructor(protected tokenService: typeof tokenServiceInstance) {
    this.tokenService = tokenService;
  }

  /**
   * Generate a secure link for downloading a PDF
   */
  generateDownloadLink(leadId: string, fileName: string, url: URL) {
    const token = this.tokenService.generateToken({ leadId, fileName }, { expiresIn: '5m' });
    const fullUrl = `${url.protocol}//${url.host}`;
    return `${fullUrl}/api/downloads/file?token=${token}`;
  }

  /**
   * Get the file path from a token
   */
  getFilePathFromToken(token: string) {
    try {
      const decoded = this.tokenService.validateToken(token) as { fileName: string };
      return path.resolve(`public/downloads/${decoded.fileName}.pdf`);
    } catch (error) {
      return null;
    }
  }
}

const downloadService = new DownloadService(tokenServiceInstance);

export default downloadService;
