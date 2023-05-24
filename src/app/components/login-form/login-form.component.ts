import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Importamos lo necesario para los reactive forms modules
import { FormGroup,FormBuilder, Validators } from '@angular/forms'; 
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{
  hide=true;

  emailHardcoded: string = 'eve.holt@reqres.in';

  passwordHardcoded: string = '12345';

  @Output() loginAction: EventEmitter<{}> = new EventEmitter<{}>();

  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  submit(){
    if(this.loginForm.valid){
      this.loginAction.emit(this.loginForm.value);
    }
    
  }


}
