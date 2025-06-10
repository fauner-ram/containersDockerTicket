import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

import { SuccessModalComponent } from './success-modal.component';

describe('SuccessModalComponent', () => {
  let component: SuccessModalComponent;
  let fixture: ComponentFixture<SuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessModalComponent, HttpClientTestingModule],
      providers: [
        { provide: NzModalRef, useValue: {} },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
