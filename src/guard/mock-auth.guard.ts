import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class MockAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id']; // Get user ID from request header

    if (!userId) {
      throw new BadRequestException('User ID is required.');
    }

    // Check if user exists in the database
    const user: User = await this.userService.getUserById(userId).catch(() => null);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    // Inject user into request for future use
    request.user = { id: user._id, email: user.username };
    return true;
  }
}
