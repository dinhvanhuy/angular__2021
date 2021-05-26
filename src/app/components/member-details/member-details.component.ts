import { Member } from 'src/app/model/member';
import { Members } from './../../model/members';
import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/service/member.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberDetail?:Member;
  active = 1;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  arr2 = [];
  constructor(private memberService: MemberService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.memberService.getMemberById(params.id).subscribe((res:Member) => {
        console.log(res);
        this.memberDetail = res;
        let arr  = res.photos.map(item => {
          let obj = {
            small: item?.url,
            medium: item?.url,
            big: item?.url
          }
          return obj;
        })
       
        this.galleryImages  = arr;
        
      });

      this.galleryOptions = [
        {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          arrowPrevIcon: 'fa fa-chevron-left',
          arrowNextIcon: 'fa fa-chevron-right',
          imageAnimation: NgxGalleryAnimation.Slide,
         // previewEnabled: true,
        },
        // max-width 800
        {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        },
        // max-width 400
        {
          breakpoint: 400,
          preview: false
        }
      ];
   //   console.log(id);
    })
  //  this.memberService.getMemberById(id);

  }

}
