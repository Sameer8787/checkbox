import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { CallService } from '../service/call.service';

@Component({
  selector: 'app-updatelist',
  templateUrl: './updatelist.component.html',
  styleUrls: ['./updatelist.component.css']
})
export class UpdatelistComponent  implements OnInit{

@Output() tableEvent = new EventEmitter<any>();

 //@Input() objdata:any;

 //@ViewChild(FormComponent) viewdata !: FormComponent
 listarray:any=[];

// //listarray=[{"roll": '',"firstname":'',"lastname":'' ,"dob":'' , "gender":'',"coursename":'', "department":'', "hobbies":'' }];

 constructor( private Ref: MatDialogRef<FormComponent> ){

 }

 addData(){
  this.tableEvent.emit(this.listarray);
  this.Closepopup();
 }
//listStudent:any[]=[];

 updatelist(obj:any){
  console.log(this.listarray);
   this.listarray.push(obj);

 }

 Closepopup(){
  this.Ref.close();
}

//  onSubmit(){
//   //console.log(this.listStudent.values);
// //   let student={
// //     "rollno":this.listarray.get('roll')?.value,
// //  "name":this.listarray.get('firstname')?.value+ " "+this.listarray.get('lastname')?.value,
// //   "age":this.listarray.get('roll')?.value,
// //   "gender":this.listarray.get('gender')?.value,
// //   "courseName":this.listarray.get('coursename')?.value,
// //  "department":this.listarray.get('department')?.value,
// //  "hobbies":this.listarray.get('hobbies')?.value
// // }
// // this.studentService.students.push(student);
//  }

ngOnInit(): void {

  }

}
