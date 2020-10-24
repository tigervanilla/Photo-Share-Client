import { Component, OnInit } from '@angular/core';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { map } from 'rxjs/operators';

export enum PhotoCategory {
  SELFIE = 'SELFIE',
  PORTRAIT = 'PORTRAIT',
  ACTION = 'ACTION',
  LANDSCAPE = 'LANDSCAPE',
  GRAPHIC = 'GRAPHIC',
};

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  BigNumber: string;
  Duration: any;
  Upload: any;
};

export type PostPhotoInput = {
  name: Scalars['String'];
  category: PhotoCategory;
  description: Scalars['String'];
  file: Scalars['Upload'];
};

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileToUpload: File;
  canUpload = false;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
  }

  onFileAdded(fileEL: HTMLInputElement) {
    this.fileToUpload = fileEL.files[0];
    if (this.fileToUpload.type !== 'image/jpeg') {
      alert('File Format not supported');
      this.fileToUpload = null;
      this.canUpload = false;
      return;
    }
    this.canUpload = true;
  }

  async upload() {
    if (!this.fileToUpload || !this.canUpload) {
      alert('Could not upload. Try Again');
      return;
    }
    const objToUpload: PostPhotoInput = {
      name: 'Dummy Name',
      category: PhotoCategory.PORTRAIT,
      description: 'Dummy Description',
      file: this.fileToUpload,
    };
    console.log(objToUpload);
    const result = await this.uploadFileMutation(objToUpload);
    console.log(result);
  }

  uploadFileMutation(input: PostPhotoInput) {
    const mutation = gql`
      mutation uploadFileMutation($input: PostPhotoInput) {
        postPhoto(input: $input) {
          name
        }
      }
    `;
    return this.apollo
      .mutate<Mutation>({mutation, variables: {input}})
      .pipe(map(({data}) => data))
      .toPromise();
  }
}
