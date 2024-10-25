import jwt from 'jsonwebtoken';

class TokenService {
  generateToken(payload: any, options?: jwt.SignOptions) {
    return jwt.sign(payload, import.meta.env.JWT_SECRET, options);
  }

  validateToken(token: string) {
    return jwt.verify(token, import.meta.env.JWT_SECRET);
  }
}

const tokenService = new TokenService();

export default tokenService;
