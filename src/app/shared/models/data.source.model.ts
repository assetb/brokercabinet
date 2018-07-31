export interface DataSourceModel<T> {
  PageNumber: number;
  PageSize: number;
  PagesCount: number;
  CountItems: number;
  Data: T[];
}
