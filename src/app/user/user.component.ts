import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../service/http-service.service';
import { User } from '../service/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User | any;
  constructor(private http: HttpServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getUserAll();
  }

  getUserAll() {
    return this.http.getUserAll().subscribe((data: any) => {
      this.user = data.data
    })
  }

  deleteUser(id:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.deleteUser(id).subscribe((data: any) => {
          if(data.required){
            Swal.fire({
              title: 'Deleted!',
              text: 'Your data has been deleted.',
              icon: 'success',
              timer: 2000
            }).then(()=>{
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              const currentUrl = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentUrl]);
              });
              
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
    })
  }

}
