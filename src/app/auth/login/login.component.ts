import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {UsersService} from "../../shared/servise/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";
import {AuthService} from "../../shared/servise/auth.service";


@Component({
  selector: 'pips-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  private message: Message;

  constructor( private UsersService: UsersService,
               private AuthService: AuthService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage('Теперь Вы можете зайти в систему', 'success');
      }
    });


    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }


  private showMessage(text: string, type: string = 'danger') {
      this.message = new Message(type, text);

      window.setTimeout(( ) => {
        this.message.text = '';
      }, 3000);

  }


  onSubmit() {
    const formData = this.form.value;

    this.UsersService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.AuthService.login();
              this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('Пароль не верный');
          }
      } else {
        this.showMessage('Такого пользователя не существует');
      }
    });
  }

}
