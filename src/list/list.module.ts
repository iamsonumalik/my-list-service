
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ListSchema } from './schemas/list.schema';
import { MockAuthGuard } from '../guard/mock-auth.guard';
import { UserService } from '../user/user.service';
import { UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ListItem', schema: ListSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService, MockAuthGuard, UserService],
  exports: [ListService],
})
export class ListModule {}
