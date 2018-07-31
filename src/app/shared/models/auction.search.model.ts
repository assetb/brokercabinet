export interface AuctionSearchModel {
  PageNumber: number;
  PageSize: number;
  Filter: string;
  StartDate: Date;
  EndDate: Date;
  StatusId: number;
  CustomerId: number;
  TraderId: number;
  BrokerId: number;
  SiteId: number;
}

const STORAGE_ITEM = 'auction.search.model';

export function createAuctionSearchModel(): AuctionSearchModel {
  const model = {
    Filter: '',
    StartDate: new Date(),
    EndDate: new Date(),
    StatusId: null,
    PageSize: 10,
    PageNumber: 0,
    BrokerId: null,
    CustomerId: null,
    TraderId: null,
    SiteId: null
  };
  return model;
}

export function saveAuctionSearchModel(model: AuctionSearchModel) {
  const json = JSON.stringify(model);
  localStorage.setItem(STORAGE_ITEM, json);
}

export function loadAuctionSearchModel(): AuctionSearchModel {
  const json = localStorage.getItem(STORAGE_ITEM);
  if (json != null) {
    return <AuctionSearchModel>JSON.parse(json);
  } else {
    return createAuctionSearchModel();
  }
}
