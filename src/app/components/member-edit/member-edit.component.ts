import { Member } from 'src/app/model/member';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/service/member.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  model?: NgbDateStruct;
  date?: {year: number, month: number};
  memberDetail?: Member;
  id = 0;

  memberEditForm!: FormGroup;
  constructor(private fb: FormBuilder, private memberService: MemberService, private route: ActivatedRoute, private calendar: NgbCalendar
    , private router: Router, private ngbDateParserFormatter: NgbDateParserFormatter,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    this.memberEditForm = this.fb.group({
      id: '',
      introduction: '',
      interests: '',
      lookingFor: '',
      country: '',
      dateOfBirth: ''
    })

    this.route.params.subscribe((params: Params) => {
      this.memberService.getMemberById(params.id).subscribe((res: Member) => {
      // this.spinner.hide();
        this.memberDetail = res;
        let dateOfBirth = new Date(res.dateOfBirth);
        const date: NgbDate = new NgbDate(dateOfBirth.getFullYear(), dateOfBirth.getMonth(),dateOfBirth.getDate());  
        this.memberEditForm.patchValue(res);
        this.memberEditForm.controls.dateOfBirth.setValue(date);
      });
    })


  }
  save() {
    let obj = {...this.memberEditForm.value};
    obj.dateOfBirth = this.ngbDateParserFormatter.format(this.memberEditForm.controls.dateOfBirth.value);
    this.memberService.updateMemberById(obj).subscribe((res) => {
      console.log('sucess');
      this.router.navigate([`/member/detail/${this.memberEditForm.controls.id.value}`])
    });
  }

  cancle() {
    this.router.navigate([`/member/detail/${this.memberEditForm.controls.id.value}`])
  }
}
