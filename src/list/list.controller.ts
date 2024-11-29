import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Query,
  Param,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ListService } from './list.service';
import { AddItemDto } from './dto/add-item.dto';
import { ListItemsDto } from './dto/list-items.dto';
import { ListItemsResponse } from './dto/list-items.response';
import { MockAuthGuard } from '../guard/mock-auth.guard';

@Controller('list')
@UseGuards(MockAuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('add')
  async addItem(@Body() addItemDto: AddItemDto, @Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    addItemDto.userId = req.user.id;
    const result = await this.listService.addItem(addItemDto);
    if (result === 'ALREADY_EXISTS') {
      throw new BadRequestException('Item already exists in your list.');
    } else if (result === 'NOT_FOUND') {
      throw new BadRequestException('Item not found.');
    }
    return result;
  }

  @Delete(':id')
  async removeItem(@Param() { id }: { id: string }, @Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = await this.listService.removeItem(id, req.user.id);
    if (!result) {
      throw new BadRequestException('Invalid id.');
    }
    return { success: result.deletedCount > 0 };
  }

  @Get()
  async listItems(
    @Query() listItemsDto: ListItemsDto,
    @Req() req: Request,
  ): Promise<ListItemsResponse> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    listItemsDto.userId = req.user.id;
    const { items, total } = await this.listService.listItems(listItemsDto);

    return {
      items: items,
      pagination: {
        total,
        page: listItemsDto.page,
        limit: listItemsDto.limit,
      },
    };
  }
}
