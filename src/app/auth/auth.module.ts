import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";



@NgModule({
    declarations:[
        SignupComponent,
        LoginComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    exports:[]
})
export class AuthModule{

}