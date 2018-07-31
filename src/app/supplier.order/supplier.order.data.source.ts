import {DataSourcePagination} from '../shared/data.source.pagination';
import {DataSourceModel} from '../shared/models/data.source.model';
import {SupplierOrderShortModel} from '../shared/models/supplier.order.short.model';
import {MatPaginator} from '@angular/material';
import {ApiService} from '../shared/api.service';
import {OnInit} from '@angular/core';

export class SupplierOrderListDatasource extends DataSourcePagination<SupplierOrderShortModel>{
  private auctionId: number;
  constructor(pagination: MatPaginator,
              private apiService: ApiService) {
    super(pagination);
  }

  setAuctionId(id: number) {
    this.auctionId = id;
  }

  search(): void {
    this.setIsLoading(true);
    this.apiService.getSupplierOrders(this.auctionId)
      .subscribe((responce: DataSourceModel<SupplierOrderShortModel>) => {
        this.setCountItems(responce.CountItems);
        this.setData(responce.Data);
        this.setIsLoading(false);
      });
  }
}
