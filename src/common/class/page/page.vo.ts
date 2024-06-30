export class Page<T = any> {
  page: number;

  pageSize: number;

  total: number;

  records: T[];

  constructor(page?: Page<T>) {
    Object.assign(this, page);
  }
}
