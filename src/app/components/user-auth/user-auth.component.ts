import { Component } from '@angular/core';
import { BaseServiceService } from '../../services/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../dtos/LoginRequest';
import { LoginResponse } from '../../dtos/LoginResponse';
import { LocalStorageService } from '../../services/local-storage.service';
import { RegistrationRequest } from '../../dtos/RegistrationRequest';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {

  loginRequest: LoginRequest = new LoginRequest;
  registerRequest: RegistrationRequest = new RegistrationRequest;

  constructor(private http: HttpClient, private baseService: BaseServiceService, private router: Router, private storage: LocalStorageService) { }

  onLogin(){
    console.log(this.loginRequest);
    this.baseService.login(this.loginRequest).subscribe((res: LoginResponse)=>{
      if(res.token){
        console.log("Login success!");
        this.storage.setItem('accessToken', res.token);
        this.router.navigateByUrl('/api/base/students');
      }
      else{
        console.log(res);
        alert("Error authentication(Token)");
      }
    });
  }

  onRegister(){
    console.log('Registration');
    try {
      this.baseService.register(this.registerRequest).subscribe(res => {
        console.log(res);
      })
    } catch(err){
      console.log(err);
      alert('Пользователь уже существует!')
    }
  }
}
