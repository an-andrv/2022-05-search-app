import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  status$ = new BehaviorSubject(false);

  on(): void {
    this.status$.next(true);
  }

  off(): void {
    this.status$.next(false);
  }
}
