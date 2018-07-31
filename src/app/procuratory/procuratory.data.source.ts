import {DataSourcePagination} from '../shared/data.source.pagination';
import {ProcuratoryShortModel} from '../shared/models/procuratory.short.model';
import {MatPaginator} from '@angular/material';
import {ApiService} from '../shared/api.service';


export class ProcuratoryDataSource extends DataSourcePagination<ProcuratoryShortModel> {
  private auctionId: number;

  constructor(pagination: MatPaginator,
              private apiService: ApiService) {
    super(pagination);
  }

  setAuctionId(id: number){
    this.auctionId = id;
  }

  search(): void {
    this.setIsLoading(true);
    this.apiService.getProcuratories(this.auctionId, this.getCurrentPageNumber(), this.getCurrentPageSize())
      .subscribe(responce => {
        this.setCountItems(responce.CountItems);
        this.setData(responce.Data);
        this.setIsLoading(false);
      });
  }

}
