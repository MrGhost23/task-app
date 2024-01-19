import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAuthService } from './jwt.service';
import { User } from 'src/Schemas/User.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.findUserById(payload.userId);
      if (!user) {
        console.error('User not found. Unauthorized.');
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      console.error('Error during user validation:', error);
      throw new UnauthorizedException();
    }
  }

  private async findUserById(userId: string): Promise<User> {
    try {
      const user = await this.userModel.findById(userId);

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
