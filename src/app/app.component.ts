import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'GitHub Repo Search';
  searchTerm: string;
  results: Observable<any[]>;
  latestSearch = new Subject<string>();
  isLoading = false;

  constructor(private http: HttpClient, private githubService: GithubService) {
    this.results = this.prepareData();
  }

  newSearch(word: string) {
    this.latestSearch.next(word);
  }

  handleClearButtonClick() {
    this.searchTerm = '';
  }

  prepareData() {
    this.isLoading = true;
    const res$ = this.latestSearch.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((term) => !!term),
      switchMap((term) => this.githubService.getRepos(term))
    );
    this.isLoading = false;
    return res$;
  }
}
