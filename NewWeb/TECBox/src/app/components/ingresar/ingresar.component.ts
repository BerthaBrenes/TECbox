import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ClientService } from 'src/app/services/client.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss'],
})
export class IngresarComponent implements OnInit {
  /**
   * Credentials for the sign
   */
  public signInCredentials: FormGroup;
  /**
   * Call passed by parameter.
   */
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAnswered = new EventEmitter<{ UserData: Object }>();

  constructor(public formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private entidadService: ApiService,
              private clientService: ClientService,
              private employeeService: EmployeeService,
              private toastController: ToastController,
              private router: Router) {

    this.signInCredentials = this.formBuilder.group({
      username: ['', Validators.compose([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }

  ngOnInit() {
  }
  /**
   * SignIn into the web as a client
   */
  save() {
    console.log(this.signInCredentials.value);
    if (!this.signInCredentials.valid) {
      console.log('Invalid');
    }
    else {

      // Client User
      if (!this.signInCredentials.controls.username.value.includes("@tecbox.com")) {

        // tslint:disable-next-line: max-line-length
        this.clientService.loginClient(this.signInCredentials.controls.username.value, this.signInCredentials.controls.password.value)
          .subscribe(
            client => {
              const answerData = {
                answer: true,
                message: client
              }
              this.onAnswered.emit({ UserData: answerData });
              this.dismiss(answerData);
            },
            (error: HttpErrorResponse) => {
              const answerData = {
                answer: false,
                message: ''
              }
              this.onAnswered.emit({ UserData: answerData });
              this.presentToast("¡Usuario o contraseña incorrectos!", 'danger');
              this.dismiss(answerData);
            }
          );

      }
      else {
        // Employee User
        // tslint:disable-next-line: max-line-length
        this.employeeService.loginEmployee(this.signInCredentials.controls.username.value, this.signInCredentials.controls.password.value)
          .subscribe(
            data => {

              // Checks if employee is DeliveryMan
              if (data["Role"] === "Administrador") {
                this.presentToast(`¡Bienvenido ${data['Name']}!`, 'success');
                const deliverer = { Name: data['Name'], Id: data['Id']['Number'] };
                const navigationExtras = {
                  queryParams: {
                    // Send deliveryMan info to next page
                    special: JSON.stringify(deliverer)
                  }
                };
                this.router.navigate(['/admin'], navigationExtras);
              } else if (data["Role"] === "Bodeguero") {
                this.presentToast(`¡Bienvenido ${data['Name']}!`, 'success');
                this.router.navigate(['/cellar']);
              }
              else {
                // tslint:disable-next-line: max-line-length
                this.presentToast('Lo sentimos. Las vistas de administración no permiten Repartidores.\n¡Usa el app de Tracking de Tecbox! ', 'warning');
              }
            },
            // Si el usuario no existe
            (error: HttpErrorResponse) => {
              this.presentToast('¡Usuario o contraseña incorrectos!', 'danger');
            });
      }
    }
  }

  /**
   * dismiss the modal
   */
  dismiss(dataD: any) {
    this.modalCtrl.dismiss({
      dismissed: true,
      data: dataD
    });
  }

  /**
   * Funtion that show Toast notification on the aplication at the begging for show the proper way to enter the email
   */
  async presentToast(messageR: string, colorR: string) {
    const toast = await this.toastController.create({
      message: messageR,
      color: colorR,
      duration: 4000
    });
    toast.present();
  }
}
