import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../service/http-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  checkoutForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpServiceService) {

    this.checkoutForm = this.formBuilder.group({
      id: '',
      username: '',
      email: '',
      password: '',
    });
  }





  ngOnInit(): void {
    let userID = this.route.snapshot.params['id'];
    this.getUser(userID);
  }

  getUser(userID: number) {
    return this.http.getUser(userID).subscribe((data: any) => {
      if (data.required) {
        const { id, username, email,password, } = data.data[0]
        this.checkoutForm.setValue({
          id:id,
          username:username,
          email: email,
          password: password
        })
      }
    })


  }

  onSubmit(): void {
   if(this.checkSummit()){
    this.updateUser()
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

  updateUser() {
     this.http.updateUser(this.checkoutForm.value).subscribe((data: any) => {
      if( data.required){
        Swal.fire({
          title: 'Deleted!',
          text: 'Your data has been deleted.',
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
