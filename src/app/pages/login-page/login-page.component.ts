import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  constructor(private route: Router, private autService: AuthService){}

  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    if(token){
      this.route.navigate(['/dashboard/home'])
    }
  }

  loginUser(value: any){

    let {email, password} = value;

    this.autService.login(email,password).subscribe((resp)=>{
      if(resp.token){
        sessionStorage.setItem('token', resp.token);
        this.route.navigate(['/dashboard/home']);
      }
    },
    (error)=>{console.error(`Ha habido un error. ${error}.`)},
    ()=>{
      console.info('Peticion de login finalizada.')
    })

  }

}
