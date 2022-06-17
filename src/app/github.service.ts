import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getRepos(word: string) {
    const url = `https://api.github.com/search/repositories?q=${word}&sort=stars&order=desc`;
    return this.http.get(url).pipe(
      map((res: any) => res.items),
      startWith([])
    );
  }
}
