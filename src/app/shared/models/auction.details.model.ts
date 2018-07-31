import {TraderModel} from './trader.model';
import {SectionModel} from './section.model';
import {TypeModel} from './type.model';
import {StatusModel} from './status.model';
import {SiteModel} from './site.model';
import {BrokerModel} from './broker.model';
import {RegulationModel} from './regulation.model';

export interface AuctionDetailsModel {
  Id: number;
  Date: Date;
  SectionId: number;
  Section: SectionModel;
  TypeId: number;
  Type: TypeModel;
  Number: string;
  StatusId: number;
  Status: StatusModel;
  Comments: string;
  NdsIncluded: boolean;
  SiteId: number;
  Site: SiteModel;
  TraderId: number;
  Trader: TraderModel;
  CustomerId: number;
  BrokerId: number;
  Broker: BrokerModel;
  RegulationId: number;
  Regulation: RegulationModel;
  FileListId: number;
  CloasedDate: Date;
}
