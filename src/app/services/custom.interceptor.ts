import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable} from '@angular/core'
import { Observable } from 'rxjs';
import { LoginRequest } from '../dtos/LoginRequest';
import { LocalStorageService } from './local-storage.service';
@Injectable()
export class CustomInterceptor implements HttpInterceptor{

  constructor(private storage: LocalStorageService){}

  intercept(req: HttpRequest<LoginRequest>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getItem("accessToken");

    if (token == null) {
      console.log(req);
      return next.handle(req);
    }

    const newClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(newClone);
    return next.handle(newClone);
  }
}
