import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

export const TOAST_STATE = {
  success: { name: 'success-toast', icon: 'fa-regular fa-circle-check' },
  warning: { name: 'warning-toast', icon: 'fa-solid fa-exclamation' },
  danger: { name: 'danger-toast', icon: 'fa-regular fa-circle-xmark' },
  info: { name: 'info-toast', icon: 'fa-regular fa-circle-question' },
};


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showAlert(title: string, text: string, icon: any, buttonText: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: buttonText
    })
  }

  showAlertConfirm(title: string, text: string, icon: any, buttonText: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: buttonText
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
  }
}
