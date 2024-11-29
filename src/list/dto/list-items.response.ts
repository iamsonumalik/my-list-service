import { ListItem } from '../schemas/list.schema';

export interface ListItemsResponse {
  items: ListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
