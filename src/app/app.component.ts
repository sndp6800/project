import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  reg="";
  pass="";
  showReg()
  { console.log("",this.reg)}
  showPass()
  {console.log("",this.pass); }
  contentHighlighted:boolean=false;
  loginForm= new FormGroup({
    registration: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    //password: new FormControl(null,[Validators.required, Validators.minLength(8)])
  })

  get registration(){
    return this.loginForm.get('registration')
  }
  get password(){
    return this.loginForm.get('password')
  } 
}
