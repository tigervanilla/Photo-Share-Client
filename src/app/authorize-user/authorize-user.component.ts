import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-authorize-user',
  templateUrl: './authorize-user.component.html',
  styleUrls: ['./authorize-user.component.css']
})
export class AuthorizeUserComponent implements OnInit {
  signingIn = false;
  me: any;

  constructor(private apollo: Apollo) { }

  async ngOnInit() {
    if (window.location.search.match(/code=/)) {
      this.signingIn = true;
      const code = window.location.search.replace('?code=', '');
      // alert(code);
      const { token } = await this.githubAuth(code);
      this.authorizationComplete(token);
    }
    if (localStorage.getItem('token')) {
      this.fetchCurrentUserDetails();
      this.signingIn = true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.signingIn = false;
    this.me = undefined;
  }

  requestCode() {
    const clientID = '41cc1936f4cc0609fa93';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  }

  githubAuth(code: string) {
    const mutation = gql`
      mutation GitHubAuth($code: String!) {
        githubAuth(code: $code) {
          token
        }
      }
    `;
    return this.apollo.mutate<any>({mutation, variables: {code}})
    .pipe(map(({data}) => data.githubAuth))
    .toPromise();
  }

  authorizationComplete(token: string) {
    localStorage.setItem('token', token);
    this.signingIn = false;
  }

  async fetchCurrentUserDetails() {
    this.me = await this.getMe();
    console.log(this.me);
  }

  getMe() {
    const query = gql`
      query Me {
        me {
          githubLogin
          name
          avatar
        }
      }
    `;
    return this.apollo.query<any>({query})
    .pipe(map(({data}) => data.me))
    .toPromise();
  }
}
