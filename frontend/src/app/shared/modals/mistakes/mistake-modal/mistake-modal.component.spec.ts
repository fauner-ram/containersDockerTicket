import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { InfoBoxeingService } from '../../../../services/info-box/info-boxeing.service';
import { ToastService } from '../../../../services/toasts/toast.service';
import { EventManagerService } from '../../../../services/events-manager/event-manager.service';

import { MistakeModalComponent } from './mistake-modal.component';

describe('MistakeModalComponent', () => {
  let component: MistakeModalComponent;
  let fixture: ComponentFixture<MistakeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MistakeModalComponent],
      providers: [
        { provide: NzModalService, useValue: {} },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: InfoBoxeingService, useValue: {} },
        { provide: ToastService, useValue: {} },
        { provide: EventManagerService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MistakeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
