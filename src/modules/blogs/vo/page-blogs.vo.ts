import { Type } from 'class-transformer';

import { BlogsVo } from './blogs.vo';
import { Page } from 'src/common/class';

export class PageBlogsVo extends Page {
  @Type(() => BlogsVo)
  records: BlogsVo[];
}

