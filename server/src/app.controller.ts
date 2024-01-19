import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthService } from './JWT/jwt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('validateToken')
  async validateToken(@Body() payload: { token: string }): Promise<any> {
    const validatedPayload = this.jwtAuthService.validateToken(payload.token);
    return { isValid: !!validatedPayload, payload: validatedPayload };
  }
}
