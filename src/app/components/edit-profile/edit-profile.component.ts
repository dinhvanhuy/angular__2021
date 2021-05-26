import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/model/member';
import { MemberService } from 'src/app/service/member.service';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  memberDetail!: Member;
  username = '';
  constructor(private memberService: MemberService, private route: ActivatedRoute) { }
  active = 1;
  token = '';
  URL = 'https://localhost:5001/api/UsersControllers/add-photos';
  //https://localhost:5001/api/
  uploader!: FileUploader;
  hasBaseDropZoneOver?: boolean;
  hasAnotherDropZoneOver?: boolean;
  response?: string;

  ngOnInit(): void {

    this.username = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User')))).userName;
    this.memberService.getMemberByUserName(this.username).subscribe((res: Member) => {
      this.memberDetail = res;
    });
    let currentUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
    if (currentUser) {
      this.token = currentUser['token'];
    }

    this.uploader = new FileUploader({
      url: this.URL,
      authToken: `Bearer ${this.token}`,
   //   disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
     // formatDataFunctionIsAsync: true,
      //headers: [{ name: 'Content-Type', value: '' }],
      autoUpload: false,
      isHTML5: true,
      maxFileSize: 10 * 1024 * 1024,
     // allowedFileType: ['image'],
      removeAfterUpload: true
    
    });
    this.hasBaseDropZoneOver = false;

    this.hasAnotherDropZoneOver = false;
    this.response = '';
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = ((item, response, status, header) => {
      if (response) {
        console.log('davao')
      }
    });
    this.uploader.response.subscribe(res => this.response = res);
  }


  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  setMainPhoto(id: number): void {
    this.memberService.setMainPhoto(id).subscribe(() => {
      this.memberDetail?.photos.forEach((item, index) => {
        if(item.isMain) item.isMain =! item.isMain;
        if (item.id == id) item.isMain = true;
      })
    });
  }

  deletePhoto(id: number) {
    this.memberService.deletePhoto(id).subscribe(() => {
      this.memberDetail!.photos = this.memberDetail?.photos.filter((item, index) => {
        return item.id != id;
      })
    });
  }


}
