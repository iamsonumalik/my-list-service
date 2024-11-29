import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AddItemDto } from './dto/add-item.dto';
import { ListItemsDto } from './dto/list-items.dto';
import { ListItem } from './schemas/list.schema';
import { ShowType } from '../common/constant';

@Injectable()
export class ListService {
  constructor(
    @InjectModel('ListItem') private readonly listModel: Model<ListItem>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async addItem(addItemDto: AddItemDto): Promise<ListItem | string> {
    const { userId, itemId, type } = addItemDto;

    const model: Model<ShowType> = this.connection.model(type);
    const item = await model.findById(itemId).catch(() => null);

    if (!item) {
      return 'NOT_FOUND';
    }

    // Check for duplicate entries
    const existingItem = await this.listModel.findOne({ userId, itemId, type });
    if (existingItem) {
      return 'ALREADY_EXISTS';
    }

    const newItem = new this.listModel({ userId, itemId, type });
    return newItem.save();
  }

  async removeItem(
    id: string,
    userId: string,
  ): Promise<{ deletedCount: number }> {
    return this.listModel
      .deleteOne({ _id: id, userId: userId })
      .exec()
      .catch(() => null);
  }

  async listItems(
    listItemsDto: ListItemsDto,
  ): Promise<{ items: ListItem[]; total: number }> {
    const { userId, page, limit, type } = listItemsDto;
    const items = await this.listModel
      .find({ userId })
      .where(type ? { type } : {})
      .populate('itemId', { _id: 1, title: 1 })
      .sort({ addedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.listModel
      .countDocuments({ userId })
      .where(type ? { type } : {});

    return { items, total };
  }
}
