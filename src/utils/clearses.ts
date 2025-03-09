import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class ClearCookieService {
  // Clear cookies method
  clearCookies(res: Response): void {
    res.cookie('access_token', '', { httpOnly: true, path: '/', maxAge: 0 });
    res.cookie('refresh_token', '', { httpOnly: true, path: '/', maxAge: 0 });
    res.cookie('role', '', { httpOnly: true, path: '/', maxAge: 0 });
    res.cookie('nestjssession', '', { httpOnly: true, path: '/', maxAge: 0 });
  }

  // Clear session and cookies method
  clearSessionAndCookies(req: Request, res: Response): Promise<void> {
    return new Promise((resolve) => {
      // Clear cookies
      this.clearCookies(res);

      // Destroy the session
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error('Session destroy error:', err);
          }
          resolve();  // Resolve the promise after session destruction
        });
      } else {
        resolve();  // Resolve immediately if there's no session to destroy
      }
    });
  }
}
