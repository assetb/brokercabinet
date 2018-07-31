import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {AuctionModel} from '../shared/models/auction.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {finalize} from 'rxjs/operators';
import {AuctionSearchModel} from '../shared/models/auction.search.model';
import {ApiService} from '../shared/api.service';

export class AuctionDataSource implements DataSource<AuctionModel> {
  private auctionSubject = new BehaviorSubject<AuctionModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countPagesSubject = new BehaviorSubject<number>(0);

  public countPages = this.countPagesSubject.asObservable();
  public loading = this.loadingSubject.asObservable();

  constructor(private apiService: ApiService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<AuctionModel[]> {
    return this.auctionSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.auctionSubject.complete();
    this.loadingSubject.complete();
    this.countPagesSubject.complete();
  }

  public search(form: AuctionSearchModel) {
    this.loadingSubject.next(true);

    this.apiService.getAuctions(form)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(auctions => {
        this.countPagesSubject.next(auctions.PagesCount);
        this.auctionSubject.next(auctions.Data);
      });
  }

}
