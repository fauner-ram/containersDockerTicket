import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistakeModalComponent } from './mistake-modal.component';

describe('MistakeModalComponent', () => {
  let component: MistakeModalComponent;
  let fixture: ComponentFixture<MistakeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MistakeModalComponent]
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
