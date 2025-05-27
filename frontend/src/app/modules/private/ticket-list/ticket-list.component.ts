import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgZorroModule } from '../../../ng-zorro.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toasts/toast.service';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component({
  selector: 'app-ticket-list',
  imports: [
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NgZorroModule
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit {

  searchFormOrders!: FormGroup;
  formCreateShopping!: FormGroup;
  form!: FormGroup; //FRMULARIO PARA PROBAR DESDE EL MISMO COMPONENTE ABRIR MODAL
  esxpendedTipeForm!: FormGroup;

  isVisible = false;//FRMULARIO PARA PROBAR DESDE EL MISMO COMPONENTE ABRIR MODAL
  loadingData: boolean = false;

  idEdit: string | null = null;
  isOkLoading = false;


  mesaage: string = '';
  mesaagePrint: string = '';
  disbabled: any;
  currentPage = 1;
  pageSize = 30;
  totalItems = 0;
  currentPageDetailItem = 1;
  pageSizeDetailItem = 100;
  totalItemsDetailItem = 0;
  idRevenueCenter: any;

  public queryListFirtsTablePricipal: string = '';


  revenueCenterList: any = [];
  dataToSend: any = [];
  projects: any = [];
  dataListItemsOne: any = [];
  dataListItemsTwo: any = [];
  dataListItemsThree: any = [];
  printDataListItems: any = [];
  printDataListItemsOne: any = [];
  // idOrderItem: any;

  userLogged: any = {};
  nameUser: any = {};
  lastNameUser: any = {};

  tooltipSeeItem = 'Ver resumen ';
  tooltipSeeItemNot = 'Sin resumen';
  tooltipContentDetailItem = 'Detalle ';
  tooltipContentUpdateDetailItem = 'Editar';
  tooltipContentDownloadDetailItem = 'Imprimir';
  tooltipContentDeleteDetailItem = 'Eliminar';

  // employeeService: EmployeeService = inject(EmployeeService);
  dataEmployee: any = [];

  imageUrl1?: string | ArrayBuffer | null = null;
  imageUrl2?: string | ArrayBuffer | null = null;
  file1: any;
  file2: any;
  selectedValue: any; // Valor seleccionado

  months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
  ];

  formattedRefundRequestDate: string | null = ''; // Fecha formateada
  formattedFromDate: string | null = ''; // Fecha formateada
  formattedToDate: string | null = ''; // Fecha formateada

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    // private modalService: NzModalService,
    private router: Router,
    private alertService: ToastService,
    private costCenterService: TicketService,
    // private datePipe: DatePipe,
  ) {
    this.createFormShoppingOrder();
    this.createFormShearch();

    const userData = localStorage.getItem('user');

    if (userData) {
      // Sabemos que no es null, así que podemos parsearlo
      this.userLogged = JSON.parse(userData);
      const idUser = this.userLogged.idUser;
      this.nameUser = this.userLogged.firstName;
      this.lastNameUser = this.userLogged.lastName;
    } else {
      console.log('No se encontró información de usuario en el localStorage.');
    }

  }
  ngOnInit(): void {
    this.getticketData();
    this.getProjects();
    // this.getExpenditureType();
    // Escucha los cambios en el dropdown para que se muestren los inputs segun el id
    this.form.get('idExpenditureType')?.valueChanges.subscribe((value) => {
      this.selectedValue = value;
    });
  }
  createFormShoppingOrder() {
    this.form = new FormGroup({
      name: new FormControl(''),
      idCostCenterProject: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    });
  }

  createFormShearch() {
    this.searchFormOrders = this.formBuilder.group({
      name: [''],
      idCostCenterProject: [''],
      // idExpenditureType: [''],
      // month: [''],
      // year: [''],
    });
  }

  getProjects() {
    // this.costCenterService.getticketData().subscribe((response: any) => {
    //   this.projects = response.data.data;
    //   this.cdr.detectChanges();
    // });
  }

  searchTableType() {
    this.queryListFirtsTablePricipal = '';

    // Obtén los valores predeterminados
    const defaultMonth = new Date().getMonth() + 1;
    const defaultYear = new Date().getFullYear();

    // Combina los valores predeterminados con los proporcionados por el formulario
    const search: Record<string, any> = {
      year: defaultYear,
      month: defaultMonth,
      ...this.searchFormOrders.value // Sobrescribe los valores si el usuario los proporciona
    };

    // Construye el query string
    for (const [key, value] of Object.entries(search)) {
      if (value != null && value.toString().trim() !== '') {
        this.queryListFirtsTablePricipal += `&${key}=${value.toString().trim()}`;
      }
    }

    // Llama al servicio con los filtros aplicados
    this.getticketData();
  }

  getticketData() {
    const query = `?page=${this.currentPage}&pageSize=${this.pageSize}${this.queryListFirtsTablePricipal}`;

    this.costCenterService.getticketData().subscribe((response: any) => {

      // this.revenueCenterList = response.data.data;
      // if (response.status === "SUCCESS" && response && response.data.data) {

      //   const data = response.data.data;

      //   // Si el usuario no está realizando una búsqueda personalizada
      //   if (this.queryListFirtsTablePricipal.includes("&year=") && this.queryListFirtsTablePricipal.includes("&month=")) {
      //     const currentMonth = new Date().getMonth() + 1;
      //     const currentYear = new Date().getFullYear();

      //     // Filtrar por el mes y año actuales
      //     this.revenueCenterList = data.filter((item: any) => {
      //       const itemDate = new Date(item.date);
      //       return (
      //         itemDate.getMonth() + 1 === currentMonth &&
      //         itemDate.getFullYear() === currentYear
      //       );
      //     });
      //     // console.log("Query enviado a la API:", this.queryListFirtsTablePricipal);
      //     // console.log("Datos obtenidos de la API después del filtro:", response.data?.data);

      //   }
        // else {
        // No filtrar si hay una búsqueda personalizada
        this.revenueCenterList = response.data;
        // console.log("Datos asignados a la tabla después del filtro:", this.revenueCenterList);
        // }


        this.totalItems = response.data.totalItems;
        this.cdr.detectChanges();
      // }
    });
  }
  onPageChange(event: any): void {
    this.currentPage = event;
    this.getticketData();
  }

  clearFilter() {
    this.currentPage = 0;
    this.pageSize = 30;
    this.queryListFirtsTablePricipal = '';
    this.getticketData();
    this.searchFormOrders.reset();
  }

  showModal() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
    this.form.reset();
    this.idEdit = null;
  }

  handleOk() {
    if (!this.form.valid) {
      this.alertService.showAlert('Error', 'Por favor revisa todos los campos en esta seccion son obligatorios', 'error', 'Cerrar');
      return;
    }

    const data = this.form.value;

    const payload: any = {
      ...data,
    };
    const payloadedit: any = {
      ...data,
    };

    if (this.idEdit) {
      payloadedit.idRevenueCenter = this.idEdit;
      this.editOrder(payloadedit);

    } else {
      this.saveCostCenter(payload);
    }

  }

  saveCostCenter(data: any) {
    this.mesaage = `Cargando, por favor espere......`;
    this.loadingData = true;

    this.costCenterService.createTicket(data).subscribe({
      next: (response: any) => {

        if (response && response.status === 'SUCCESS') {
          this.loadingData = false;
          this.alertService.showAlert('Éxito!', 'Se ha cargado de manera exitosa', 'success', 'Cerrar');
          this.getticketData();

          this.form.reset();
          this.cdr.detectChanges();
        }

      },
      complete: () => {
        // this.loadingData = false;
      },
      error: (error: any) => {
        this.alertService.showAlert('Error', 'Tenemos inconvenitenes para crear , comuniquese con su proveedor de software', 'error', 'Cerrar')
        this.loadingData = false;
        this.form.reset();

      }
    })
  }

  editOrder(data: any) {
    this.mesaage = `Actualizando, por favor espere......`;
    this.loadingData = true;
    this.costCenterService.updateTicket(data).subscribe({
      next: (response: any) => {

        if (response && response.status === 'SUCCESS') {
          this.loadingData = false;
          this.alertService.showAlert('Éxito!', 'Se ha editado de manera exitosa', 'success', 'Cerrar');
          this.getticketData();
          this.form.reset();
          this.idEdit = null;
          this.cdr.detectChanges();

        }
      },
      error: () => {
        this.loadingData = false;
        this.alertService.showAlert('Error', 'Tenemos inconvenitenes para editar , comuniquese con su proveedor de software', 'error', 'Cerrar')
        this.form.reset();
      },
      complete: () => {

      },
    })
  }

  showEdit(idRevenueCenter: any, idCostCenterProject: any) {
    this.idRevenueCenter = idRevenueCenter;
    const itemToEdit = this.revenueCenterList.filter((item: any) => item.idRevenueCenter === idRevenueCenter)[0];
    const idCostProyect: any = this.projects.filter((id: any) => id.idCostCenterProject === idCostCenterProject)[0];

    // Convertir la fecha a la zona horaria local
    const toDate = new Date(itemToEdit.toDate);
    const fromDate = new Date(itemToEdit.fromDate);
    const localDateToDate = new Date(toDate.getTime() + toDate.getTimezoneOffset() * 60000);
    const localDateFromDate = new Date(fromDate.getTime() + fromDate.getTimezoneOffset() * 60000);

    this.form.patchValue({
      idCostCenterProject: idCostProyect.idCostCenterProject,

      toDate: localDateToDate,
      fromDate: localDateFromDate,
      name: itemToEdit.name,
    });
    this.idEdit = itemToEdit.idRevenueCenter;
    this.showModal();

  }


  deleteOrder(id: any): void {
    const confirmDelete = this.alertService.showAlertConfirm('Esta seguro de eliminar este registro?', 'Una vez eliminado no podra recuperarlo debera crearlo nuevamente', 'warning', 'Eliminar')

    confirmDelete.then((response: any) => {
      if (response) {
        // Solo mostramos el loader si el usuario confirma la acción
        this.loadingData = true;
        this.mesaage = `Eliminando, por favor espere......`;
        this.costCenterService.deleteFile(id).subscribe({
          next: (response: any) => {
            if (response.status === 'SUCCESS') {
              this.getticketData();
              // this.searchFormDaily.reset();
              this.cdr.detectChanges();
              this.alertService.showAlert('Éxito!', 'Se ha eliminado de manera exitosa', 'success', 'Cerrar');
            }
          },
          complete: () => {
            this.loadingData = false; // Aseguramos que se oculta el loader al finalizar
          },
          error: () => {
            this.alertService.showAlert('Error', 'Ocurrió un error al eliminar el registro', 'error', 'Cerrar');
          },
        });
      } else {
        // Cuando se cancela, aseguramos que no quede el loader activo
        this.loadingData = false;
      }
    });
  }

  openSummaryModal(idRevenueCenter: number): void {
    // const modal = this.modalService.create<CenterCostSummaryComponent>({
    //   nzContent: CenterCostSummaryComponent,
    //   nzCentered: true,
    //   nzClosable: true,
    //   nzMaskClosable: false, // Evita que se cierre al hacer clic fuera del modal
    //   nzFooter: null, // Ocultar botones por defecto
    //   nzStyle: { width: '91%' }
    // });

    // // Establecemos el valor del idOrderItem en el componente del modal
    // const instance = modal.getContentComponent();
    // if (instance) {
    //   instance.idRevenueCenter = idRevenueCenter; // Pasamos el parámetro al componente
    // }

    // // Si necesitas hacer algo adicional con el modal
    // modal.afterOpen.subscribe(() => {
    //   // console.log('Modal abierto');
    // });

    // // Retornar resultado después de cerrar
    // modal.afterClose.subscribe((result: any) => {
    //   if (result) {
    //     // console.log('Resultado al cerrar:', result);
    //   }
    // });
  }
  goItemDetailPage(idRevenueCenter: any, idCostCenterProject: any) {
    this.router.navigate([`/cost-summary/detail/${idRevenueCenter}`], { queryParams: { idCostCenterProject } });
    // this.router.navigate([`/expenses/detail/${idOrder}`]);
  }
  goToSummaryPage(idRevenueCenter: any, idCostCenterProject: any) {
    this.router.navigate([`/cost-summary/${idRevenueCenter}`], { queryParams: { idCostCenterProject } });
  }


}
