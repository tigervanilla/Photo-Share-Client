import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mutations',
  templateUrl: './mutations.component.html',
  styleUrls: ['./mutations.component.css']
})
export class MutationsComponent implements OnInit {
  fakeUsersAdded: any[];
  processing: boolean;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
  }

  async addFakeUsers(count) {
    if (!count || count < 1) {
      return;
    }
    this.processing = true;
    count = parseInt(count, 10);
    this.fakeUsersAdded = await this.addFakeUsersApi(count);
    console.log('faseUsersAdded::', this.fakeUsersAdded);
    this.processing = false;
  }

  addFakeUsersApi(count: number = 1) {
    const mutation = gql`
      mutation addFakeUsers($count: Int!) {
        addFakeUsers(count: $count) {
          githubLogin
          name
          avatar
        }
      }
    `;
    return this.apollo.mutate<any>({mutation, variables: {count}})
    .pipe(map(({data}) => data.addFakeUsers))
    .toPromise();
  }
}
