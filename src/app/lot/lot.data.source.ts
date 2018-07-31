import {LotShortModel} from '../shared/models/lot.short.model';
import {DataSourcePagination} from '../shared/data.source.pagination';
import {MatPaginator} from '@angular/material';
import {ApiService} from '../shared/api.service';
import {DataSourceModel} from '../shared/models/data.source.model';

export class LotDataSource extends DataSourcePagination<LotShortModel> {
  private auctionId: number;

  constructor(pagination: MatPaginator,
              private apiService: ApiService) {
    super(pagination);
  }

  setAuctionId(id: number) {
    this.auctionId = id;
  }

  search() {
    this.setIsLoading(true);
    this.apiService.getLots(this.auctionId)
      .subscribe((responce: DataSourceModel<LotShortModel>) => {
        this.setIsLoading(false);
        this.setCountItems(responce.CountItems);
        this.setData(responce.Data);
      });
  }
}
