import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IRepository, IResponse } from '../app.model';
import { PreloaderService } from './preloader.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  constructor(private http: HttpClient, private preloaderService: PreloaderService) { }

  searchByName(name: string): Observable<IRepository[]> {
    const timerId = setTimeout(() => this.preloaderService.on(), 1000);

    return this.http.get<IResponse>(environment.urls.searchByName(name)).pipe(
      map((response:IResponse) => response.items),
      finalize(() => {
        this.preloaderService.off();
        if (timerId) {
          clearTimeout(timerId);
        }
      })
    );
  }
}
