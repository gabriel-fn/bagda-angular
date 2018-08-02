import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ValidateService } from '../validate.service';


@Injectable()
export class ValidateInterceptor implements HttpInterceptor {

    constructor (public injector: Injector) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(tap(    
            (res) => { },
            (error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 422) {
                        const validateService = this.injector.get(ValidateService);
                        validateService.showInvalidData(error.error.errors);
                    }
                }
            })
        );
    }
}