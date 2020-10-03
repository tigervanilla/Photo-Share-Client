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
  totalUsers: number;
  totalPhotos: number;

  constructor(private apollo: Apollo) {}

  async ngOnInit() {
    try {
      const result = await this.fetchUserAndPhotoCount();
      this.totalPhotos = result.totalPhotos;
      this.totalUsers = result.totalUsers;
      console.log(`Total Photos=${this.totalPhotos}\nTotal Users=${this.totalUsers}`);
    } catch (err) {
      console.error(err);
    }
  }

  fetchUserAndPhotoCount() {
    const query = gql`
      query UserAndPhotoCount {
        totalUsers
        totalPhotos
      }
    `;
    return this.apollo.query<any>({query})
    .pipe(map(({data}) => data))
    .toPromise();
  }
}
