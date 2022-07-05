import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-detail',
  templateUrl: './base-detail.component.html',
  styleUrls: ['./base-detail.component.scss']
})
export class BaseDetailComponent implements OnInit, OnDestroy {
  today = new Date();
  intervalId: any;
  userData = { user_name: '', branch_name: '', branch_id: '' }
  constructor() { }

  ngOnInit(): void {
    this.fetchUserData();
    this.intervalId = setInterval(() => {
      this.today = new Date();
    }, 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  fetchUserData() {
    this.userData.user_name = localStorage.getItem('user_name')!;
    this.userData.branch_name = localStorage.getItem('branch_name')!
    this.userData.branch_id = localStorage.getItem('branch_id')!
  }
}
