import {HttpClient} from '@angular/common/http';
import {ContextService} from './context.service';
import {Observable} from 'rxjs/Observable';
import {SectionModel} from './models/section.model';
import {SiteModel} from './models/site.model';
import {TypeModel} from './models/type.model';
import {StatusModel} from './models/status.model';
import {OnDestroy} from '@angular/core';

export class BaseComponent {
  public statuses: Observable<StatusModel[]>;
  public sections: Observable<SectionModel[]>;
  public types: Observable<TypeModel[]>;
  public sites: Observable<SiteModel[]>;
  constructor(protected context: ContextService) {
    this.statuses = context.statuses.asObservable();
    this.sections = context.sections.asObservable();
    this.types = context.types.asObservable();
    this.sites = context.sites.asObservable();
  }
}
