import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
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
  @Output() onAnswered = new EventEmitter<{ UserData: Object}>();

  constructor(public formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private entidadService: ApiService,
              private toastController: ToastController,
              private router: Router ) {
    this.signInCredentials = this.formBuilder.group({
      username: ['', Validators.compose([ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }

  ngOnInit() {
  }
  /**
   * SignIn into the web as a client
   */
  save(){
    console.log(this.signInCredentials.value);
    if (!this.signInCredentials.valid){
      console.log('Invalid');
    }
    else{
      if (!this.signInCredentials.controls.username.value.includes("@tecbox.com")){
        // tslint:disable-next-line: max-line-length
        const answerTemporalData = this.entidadService.getClienteTemporal(this.signInCredentials.controls.username.value, this.signInCredentials.controls.password.value);
        if (answerTemporalData.answer){
          console.log('usuario encontrado');
          this.onAnswered.emit({UserData: answerTemporalData});
          this.dismiss(answerTemporalData);
        }
      }
      // tslint:disable-next-line: max-line-length
      // this.entidadService.login(this.signInCredentials.controls.username.value, this.signInCredentials.controls.password.value)
      //   .subscribe(
      //     data => {

      //       // Checks if employee is DeliveryMan
      //       if (data["Role"] === "Administrador"){
      //         this.presentToast(`¡Bienvenido ${data['Name']}!`, 'success');
      //         let deliverer = { Name: data['Name'], Id: data['Id']['Number']};
      //         let navigationExtras = {
      //           queryParams: {
      //             // Send deliveryMan info to next page
      //             special: JSON.stringify(deliverer)
      //           }
      //         };
      //         this.router.navigate(['/admin'], navigationExtras);
      //       } else if ( data["Role"] === "Bodeguero"){
      //         this.presentToast(`¡Bienvenido ${data['Name']}!`, 'success');
      //         this.router.navigate(['/cellar']);
      //       }
      //       else{
      //         this.presentToast('`Lo sentimos. Solo se permite el ingreso a repartidores.`', 'warning');
      //       }
      //     },
      //     // Si el usuario no existe
      //     (error: HttpErrorResponse) => {
      //       this.presentToast('¡Usuario o contraseña incorrectos!', 'danger');
      //     });
        }
  }
  /**
   * dismiss the modal
   */
  dismiss(data: any) {
    this.modalCtrl.dismiss({
      dismissed: true,
      data: data
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
