import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AccountService} from '../account/account.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  appUrl = environment.appUrl;

  constructor(
    private accountService: AccountService,
    private route: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${this.appUrl}${req.url}`,
      withCredentials: true
    });

    return next.handle(apiReq)
      .map((event: HttpEvent<any>) => event)
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log('Not authorization');
            this.accountService.setIsAuth(false);
            this.route.navigate(['/account']);
          }
          return Observable.throw(err);
        }

      });
  }

}
