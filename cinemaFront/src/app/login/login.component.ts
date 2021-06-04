import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    sessionStorage.setItem('token', '');

  }

  handleLogin() {
    console.log(this.username);
    console.log(this.password);
    this.loginService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/admin/cinema']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
