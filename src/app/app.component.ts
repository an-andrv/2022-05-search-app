import { Component, OnDestroy } from '@angular/core';
import { debounceTime, Observable, of, Subject, takeUntil } from 'rxjs';
import { RepositoriesService } from './services/repositories.service';
import { IRepository } from './app.model';
import { PreloaderService } from './services/preloader.service';
import { getErrorText } from './shared/utils';
import { MIN_CHARACTERS_TO_SEARCH } from './shared/constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  repositories: IRepository[] = [];
  isNotResults = false;
  errorMessageText = '';
  searchText = '';

  isLoading$: Observable<boolean> = of(false);

  private onDestroy$ = new Subject<true>();

  constructor(
    private repositoriesService: RepositoriesService,
    private preloaderService: PreloaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.preloaderService.status$;
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchText = params['repositoryName'] || '';
      this.reset();

      if (this.searchText?.length > MIN_CHARACTERS_TO_SEARCH) {
        this.repositoriesService.searchByName(this.searchText).pipe(
          takeUntil(this.onDestroy$),
          debounceTime(500)
        ).subscribe({
          next: repositories => {
            this.repositories = repositories;
            this.isNotResults = !repositories.length;
          },
          error: errorResponse => {
            this.errorMessageText = getErrorText(errorResponse);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  onFilter(textFilter: string) {
    this.router.navigate([''], { queryParams: { repositoryName: textFilter } });
  }

  makeSerialNumber(index: number): number {
    return index + 1;
  }

  reset() {
    this.repositories = [];
    this.isNotResults = false;
    this.errorMessageText = '';
  }
}
