import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { TestErrorComponent } from './components/test-error/test-error.component';
import { MemberComponent } from './components/member/member.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FileUploadModule } from 'ng2-file-upload';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TestErrorComponent,
    MemberComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    EditProfileComponent,
    //LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, 
    NgxGalleryModule,
    // AngularFontAwesomeModule
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FileUploadModule
    
  ],
    
    exports: [FileUploadModule],
  providers: [AuthService, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
