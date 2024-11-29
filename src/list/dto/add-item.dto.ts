import { IsString, IsEnum } from 'class-validator';
import { ShowType, ShowTypeEnum } from '../../common/constant';

export class AddItemDto {
  userId?: string; // Will be set by the guard

  @IsString()
  itemId: string;

  @IsEnum(ShowTypeEnum)
  type: ShowType;
}
