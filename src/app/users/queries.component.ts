import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  totalUsers: number;
  userList: any[];
  loading: boolean;

  constructor(private apollo: Apollo) { }

  async ngOnInit() {
    this.loading = true;
    const response = await this.fetchAllUsers();
    this.totalUsers = response.totalUsers;
    this.userList = response.allUsers;
    this.loading = false;
  }

  fetchAllUsers() {
    const query = gql`
      query AllUsers {
        totalUsers
        allUsers {
          name
          avatar
          githubLogin
        }
      }
    `;
    return this.apollo.query<any>({query})
    .pipe(map(({data}) => data))
    .toPromise();
  }

}
