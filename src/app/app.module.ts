import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { FormsModule } from "@angular/forms";
import { UsersService } from "./shared/servise/users.service";
import {AuthService} from "./shared/servise/auth.service";
import {SystemModule} from "./system/system.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    FormsModule,
    SystemModule,
    BrowserAnimationsModule,

  ],
  providers: [ UsersService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
