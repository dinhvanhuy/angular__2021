import { Members } from './../../model/members';
import { MemberService } from './../../service/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  listMembers: any;
  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.getAllMember().subscribe((res:Members) => {
      this.listMembers = res;
      console.log(this.listMembers)
    })
  }

}
