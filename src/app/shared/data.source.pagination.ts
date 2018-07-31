import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * Класс включает работу с MatPagination
 *  @param T Тип данных.
 */
export abstract class DataSourcePagination<T> implements DataSource<T> {
  private data = new BehaviorSubject<T[]>([]);
  private loading = false;

  constructor(private pagination: MatPaginator) {
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.data.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.data.complete();
    // this.loadingSubject.complete();
  }

  /**
   * Статус загрузки данных
   * @returns {boolean} true - если данные ещё загружаются. false - данные загружены и готовы.
   */
  getIsLoading(): boolean {
    return this.loading;
  }

  /**
   * Возвращает номер текущей страницы из MatPagination
   * @returns {number} Номер текущей страницы
   */
  public getCurrentPageNumber(): number {
    return this.pagination.pageIndex;
  }

  /**
   * Возвращает текущий размер страницы установленный в MatPagination
   * @returns {number} Размер страницы
   */
  public getCurrentPageSize(): number {
    return this.pagination.pageSize;
  }

  /**
   * Загрузка данных
   */
  public abstract search(): void;

  /**
   *Устанавливает статус загрузки данных
   * @param {boolean} state true - данные загружаются, false - даннык загруженны
   */
  protected setIsLoading(state: boolean) {
    this.loading = state;
  }

  /**
   * Устанавливает общее кол-во записей для подсчета страниц
   * @param {number} count Общее кол-во записей
   */
  protected setCountItems(count: number) {
    this.pagination.length = count;
  }

  /**
   * Устанавливает данные для отображения
   * @param {T[]} data Данные
   */
  protected setData(data: T[]) {
    this.data.next(data);
  }
}
