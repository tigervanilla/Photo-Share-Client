import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Scalars, PhotoCategory } from '../file-upload/file-upload.component';

export interface User {
  githubLogin: string;
  name: string;
  avatar: string;
  postedPhotos: any;
  inPhotos: any;
}

export interface Photo {
  id: string;
  created: any;
  url: string;
  name: string;
  description: string;
  category: PhotoCategory;
  postedBy: User;
  taggedUsers: [User];
}

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  userList: Partial<User>[] = [];
  photoList: Partial<Photo>[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.newUserSubscription();
    this.newPhotoSubscription();
  }

  newUserSubscription() {
    const listenForUsers = gql`
      subscription UserSubscription{
        newUser {
          githubLogin
          name
        }
      }
    `;
    this.apollo.subscribe<any>({ query: listenForUsers })
    .subscribe(res => {
      if (res.data && res.data.newUser) {
        console.log('newUser::', res);
        this.userList.push(res.data.newUser);

      }
    });
  }

  newPhotoSubscription() {
    const listenForPhotos = gql`
      subscription PhotoSubcription{
        newPhoto {
          id
          name
          category
        }
      }
    `;
    this.apollo.subscribe<any>({ query: listenForPhotos })
    .subscribe(res => {
      if (res.data && res.data.newPhoto) {
        console.log('newPhoto::', res);
        this.photoList.push(res.data.newPhoto);
      }
    });
  }

}
