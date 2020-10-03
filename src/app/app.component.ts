import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'photo-share-client';
  userList = [];

  constructor(private apollo: Apollo) {}

  async ngOnInit() {
    this.userList = await this.fetchAllUsers();
  }

  fetchAllUsers() {
    const query = gql`
      query GetAllUsers {
        allUsers {
          name
          githubLogin
          avatar
        }
      }
    `;
    return this.apollo.query<any>({query})
    .pipe(map(({data}) => data.allUsers))
    .toPromise();
  }
}
