import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxChartsModule],
  exports: [FormsModule, ReactiveFormsModule, NgxChartsModule]
})
export class SharedModule { }
