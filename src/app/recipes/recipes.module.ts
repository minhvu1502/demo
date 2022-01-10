import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { FormComponent } from './layout/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DetailComponent } from './layout/detail/detail.component';


@NgModule({
  declarations: [
    LayoutComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RecipesModule { }
