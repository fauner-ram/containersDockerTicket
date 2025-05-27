import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-success-modal',
  imports: [],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss'
})
export class SuccessModalComponent implements OnInit {

  constructor(private modal: NzModalRef, private router: Router) { }

  ngOnInit(): void {

  }

  redirecTo(): void {
    this.modal.destroy();
    this.router.navigate(['/dash']);
  }
  close(): void {
    this.modal.destroy();
  }

}
