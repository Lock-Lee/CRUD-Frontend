import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../service/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})

export class InsertComponent {

  constructor(private formBuilder: FormBuilder,private router: Router,private http: HttpServiceService) {}

  checkoutForm = this.formBuilder.group({
    username: '',
    email: '',
    password:''
  });

  onSubmit(): void {
    if(this.checkSummit()){
      this.createUser()
      this.checkoutForm.reset();
    }
   

  }
  checkSummit(){
    if (!this.checkoutForm.get('username')?.value) {
      Swal.fire({
        title: 'Warning!',
        text: 'Check username',
        icon: 'warning',
        timer: 2000
      })
     return false
    }else if (!this.checkoutForm.get('email')?.value) {
      Swal.fire({
        title: 'Warning!',
        text: 'Check email',
        icon: 'warning',
        timer: 2000
      })
      return false
    }else if (!this.checkoutForm.get('password')?.value) {
      Swal.fire({
        title: 'Warning!',
        text: 'Check password',
        icon: 'warning',
        timer: 2000
      })
      return false
    }else{
      return true
    }
  }
  createUser() {
     this.http.createUser(this.checkoutForm.value).subscribe((data: any) => {
      if( data.required){
        Swal.fire({
          title: 'Success!',
          text: 'Your data has been success.',
          icon: 'success',
          timer: 2000
        }).then(()=>{
          this.router.navigate(['/home']);
        })
       
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong.',
          icon: 'error',
          timer: 2000
        })
      }
     
    })
  }
}
