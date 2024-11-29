import { IsString, IsOptional, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ShowType, ShowTypeEnum } from '../../common/constant';
export class ListItemsDto {
  userId?: string; // Will be set by the guard
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number;

  @IsString()
  @IsOptional()
  @IsEnum(ShowTypeEnum)
  type: ShowType;
}
