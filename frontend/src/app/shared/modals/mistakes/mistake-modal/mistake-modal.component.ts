import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgZorroModule } from '../../../../ng-zorro.module';
import { InfoBoxeingService } from '../../../../services/info-box/info-boxeing.service';
import { SuccessModalComponent } from '../../success-modal/success-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastService } from '../../../../services/toasts/toast.service';
import { EventManagerService } from '../../../../services/events-manager/event-manager.service';

@Component({
  selector: 'app-mistake-modal',
  imports: [
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NgZorroModule
  ],
  templateUrl: './mistake-modal.component.html',
  styleUrl: './mistake-modal.component.scss'
})
export class MistakeModalComponent implements OnInit {
  @Input() idCustomer!: any; // Recibimos el id pasado desde el modal

  isSubmitData: boolean = false;
  isSubmitDownLoadExcel1: boolean = false;
  isSubmitDownLoadExcel2: boolean = false;
  isSubmitUpLoadExcel1: boolean = false;
  isSubmitUpLoadExcel2: boolean = false;
  disabledSubmitUpLoadExcel1: boolean = false;
  disabledSubmitUpLoadExcel2: boolean = false;
  isEditCompny: boolean = false;


  file1: File | null = null;
  file2: File | null = null;

  id;
  userLogged: any = [];
  idUserLogged: any;

  constructor(
    private modal: NzModalService,
    public router: Router,
    private infoBoxeingService: InfoBoxeingService,
    private cdr: ChangeDetectorRef,
    private eventManager: EventManagerService,
    private activatedRoute: ActivatedRoute,
    private alertService: ToastService,
  ) {
   
    this.id = this.activatedRoute.snapshot.params;
    this.id = this.activatedRoute.snapshot.params['id'];//extrae por la ruta 
    this.userLogged = this.eventManager.getDataUser();
    // console.log(this.eventManager.getDataUser());
    const userData = localStorage.getItem('userLogged');
    if (userData) {
      this.userLogged = JSON.parse(userData);
      this.idUserLogged = this.userLogged.id;
      // console.log(this.idUserLogged);
    } else {
      this.userLogged = null;
    }
  }

  ngOnInit(): void {
    console.log("id capturado de la respuesta del send", this.idCustomer);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Evita que el navegador abra el archivo
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault(); // Previene el comportamiento por defecto

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.assignFile(file, index);
    }


  }

  loadFiles1(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.file1 = file;
      console.log('Selected file:', this.file1?.name);
    }
  }
  loadFiles2(event: any, index: number) {
    if (event.target.files.length > 0) {
      // const file: FileList = event.target.files[0];
      this.file2 = event.target.files[0];
      console.log("files:", this.file2);
      // this.upLoadOrderByIdItem2(this.file2);
    }
  }
  assignFile(file: File, index: number) {
    switch (index) {
      case 1:
        this.file1 = file;
        break;
      case 2:
        this.file2 = file;
        break;

    }
    console.log(`Files ${index} Selected:`, file.name);
  }

  uploadExcelBoxKitData() {
    this.isSubmitUpLoadExcel1 = true;
    const fileToUpload = new FormData();
    fileToUpload.append('file', this.file1!);
    fileToUpload.append('idCompany', this.idCustomer);
    // const body = {           
    //   idCompany: this.idCustomer
    // };
    // fileToUpload.append('datos', JSON.stringify(body));

    this.infoBoxeingService.uploadExcelBoxKitData(fileToUpload).subscribe({
      next: (res: any) => {
        this.showSuccessModal();
        this.isSubmitUpLoadExcel1 = false;
        this.cdr.detectChanges();      
      },
      error: (error: any) => {
        this.isSubmitUpLoadExcel1 = false;
        this.cdr.detectChanges();
        const errorMessage = error.error?.message || 'Sorry, there was an error, please check the file and try again.';
        this.alertService.showAlert('Mistake!', errorMessage, 'error', 'Close');
      },
      complete: () => { this.cdr.detectChanges(); }
    });
  }
  uploadExcelShipmentData() {
    this.isSubmitUpLoadExcel2 = true;
    const fileToUpload = new FormData();
    fileToUpload.append('file', this.file2!);
    fileToUpload.append('idCompany', this.idCustomer);

    this.infoBoxeingService.uploadExcelShipmentData(fileToUpload).subscribe({
      next: (res: any) => {
        this.isSubmitUpLoadExcel2 = false;
        this.showSuccessModal();
        this.cdr.detectChanges();
      
      },
      error: (error: any) => {
        this.isSubmitUpLoadExcel2 = false;
        this.cdr.detectChanges();
        const errorMessage = error.error?.message || 'Sorry, there was an error, please check the file and try again.';
        this.alertService.showAlert('Mistake!', errorMessage, 'error', 'Close');
      },
      complete: () => { this.cdr.detectChanges(); }
    });
  }

  showSuccessModal(): void {
    const modal = this.modal.create<SuccessModalComponent>({
      nzContent: SuccessModalComponent,
      nzCentered: true,
      nzClosable: true,
      nzFooter: null, // Ocultar botones por defecto
      nzMaskClosable: false,
      nzStyle: { width: '91%' }
    });

    // Establecemos el valor del idOrderItem en el componente del modal
    const instance = modal.getContentComponent();
    // if (instance) {
    //   instance.documentUrl = documentUrl; // Pasamos el parámetro al componente
    // }

    // Si necesitas hacer algo adicional con el modal
    modal.afterOpen.subscribe(() => {
      console.log('Modal abierto');
    });

    // Retornar resultado después de cerrar
    modal.afterClose.subscribe((result: any) => {
      if (result) {
        console.log('Resultado al cerrar:', result);
      }
    });
  }
}
