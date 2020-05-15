import { Component, OnInit, ChangeDetectorRef,Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Validators,FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {RestApiService} from '../../service/rest-api.service';
import { error } from 'util';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';


/**
 * Component that works for the page Login Controller
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  
  //Boolean for the valid email 
  invalidEmail:boolean= false;
  
  //Boolean for the valid password 
  invalidPassword:boolean=false;
  
  // Data of all the clients
  data:any;
  
  // Input of the correct clients
  @Input() set src(val:any){
    this.data = val;
}

  // Is a Form Group that will valid the entry of the credential
  public ComponentLoginForm: FormGroup;

  /**
   * Constructor will contain the form validators
   * @param cdr Detect Changes in the ngOnInit
   * @param formBuilder Charge of form and validations
   * @param toastController Controller of Toast Component
   * @param router Controller for the Router
   */
  constructor(
    private cdr:ChangeDetectorRef,
    public toastController:ToastController,
    public formBuilder:FormBuilder,
    public api: RestApiService,
    private router:Router
  ) { 
     /**
       * Funtion that valid the password as an input required and the email with an especific patter
       */
      this.ComponentLoginForm = formBuilder.group({
        password:['',Validators.required],
        email:['',Validators.compose([ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}'),Validators.required])]
      });
     
  }

  ngOnInit() {}

  /**
   * Funtion for send all the information of the forms
   */
  summit(){
    
    // The credentials was valid so the value containt an object with the values 
    if(!this.ComponentLoginForm.valid){
      console.log('Invalid');
      if(!this.ComponentLoginForm.controls.email.valid){
        console.log('email invalido')
        this.invalidEmail=true;
      }
      else if(!this.ComponentLoginForm.controls.password.valid){
        console.log('password invalid')
        this.invalidPassword=true;
      }

    }
    else{

      // Para ingresar el correo debe ser @tecbox.com
      if(!this.ComponentLoginForm.value.email.includes("@tecbox.com")){
        this.presentToastEmail();
        return;
      }
      
      this.api.login(this.ComponentLoginForm.value.email, this.ComponentLoginForm.value.password)
        .subscribe(
          data => {

            // Checks if employee is DeliveryMan
            if (data["Role"] == "Repartidor"){

              this.presentToastSuccess(data['Name']);

              let deliverer = { Name:data['Name'], Id:data['Id']['Number']};
              
              let navigationExtras = {
                queryParams: {
                  // Send deliveryMan info to next page
                  special: JSON.stringify(deliverer)
                }
              }
              this.router.navigate(['/tracking'],navigationExtras);
            }
            else{
              this.presentToastNotDM();
            }
            
          },

          // Si el usuario no existe
          (error:HttpErrorResponse) => {
            this.presentToastInvalidCrendential();
          });    

    }
  }



  /**
   * Funtion that show Toast notification on the aplication at the begging for show the proper way to enter the email
   */
  async presentToastEmail() {
    const toast = await this.toastController.create({
      message: 'Debes ingresar con tu cuenta @tecbox.com',
      color:"danger",
      duration: 4000
    });
    toast.present();
  }

  /**
   * Funtion that show Toast notification on the aplication when the credentials are correct and its going to summit the information
   */
  async presentToastSuccess(name:string) {
    const toast = await this.toastController.create({
      message: `¡Bienvenido ${name}!`,
      color:"success",
      duration: 2000
    });
    toast.present();
  }

   /**
   * Funtion that show Toast notification on the aplication when the employee is not DeliveryMan
   */
  async presentToastNotDM() {
    const toast = await this.toastController.create({
      message: `Lo sentimos. Solo se permite el ingreso a repartidores.`,
      color:"warning",
      duration: 2000
    });
    toast.present();
  }

  /**
   * Function for the Toast Invalid Credential, when the email or the password doesnt fix it
   */
  async presentToastInvalidCrendential() {
      const toast = await this.toastController.create({
        message: '¡Usuario o contraseña incorrectos!',
        color:"danger",
        duration: 2000
      });
      toast.present();
    }

}
