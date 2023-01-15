import { Component, OnInit, ViewChild, Output, Input, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { UpdatelistComponent } from '../updatelist/updatelist.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import{map, startWith} from 'rxjs/operators';
import { CallService } from '../service/call.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions!: Observable<string[]>;

  viewStudent:any;
  isViewMode:boolean = false;
isAddToListClicked: boolean = false;

  @ViewChild(UpdatelistComponent) viewdata !: UpdatelistComponent;

  inputobj= {"rollno":'', "name":'',"firstname":'',"lastname":'' ,"dob":'',"age":0
   , "gender":'',"courseName":'', "department":'', "hobbies":''};


TransferData( ){
  this.isAddToListClicked = true;
  console.log(this.isAddToListClicked);
  if(this.studentForm.valid){
    let age:number = 0;
    if(this.studentForm.get('dob') != null){
      age = ((new Date().getFullYear())-(new Date(this.studentForm.get('dob')?.value).getFullYear()));
  
    }
  
    this.inputobj={"rollno":this.studentForm.get("rollno")?.value, "name":this.studentForm.get("firstname")?.value+ ' '+ this.studentForm.get("lastname")?.value,"firstname":this.studentForm.get("firstname")?.value, "lastname":this.studentForm.get("lastname")?.value, 
    "dob":this.studentForm.get("dob")?.value , "age":age, "gender":this.studentForm.get("gender")?.value,
                    "courseName":this.studentForm.get("courseName")?.value,"department":this.studentForm.get("department")?.value, "hobbies": this.studentForm.get("hobbies")?.value};
  
    this.viewdata.updatelist(this.inputobj);
  }
 

}

checkboxData: Array<any> = [
  { name: 'Arts', value: 'arts' },
  { name: 'Music', value: 'music' },
  { name: 'Sports', value: 'sports' },
];

onCheckboxChange(e: any) {
  const checkArray: FormArray = this.studentForm.get('hobbies') as FormArray;
  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: any) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}

// reactive form and validators
studentForm!: FormGroup;
constructor(private fb: FormBuilder,
            private Ref: MatDialogRef<FormComponent>,
            private studentService:CallService,
            @Inject(MAT_DIALOG_DATA) data: { student: any }){
              this.createForm();
              this.viewStudent = data.student;
               console.log("viewStudent", this.viewStudent);
               if(this.viewStudent){
                this.isViewMode = true;
                this.initializeViewForm(this.viewStudent);
             }
               
            }

 
initializeViewForm(student:any){
console.log(this.studentForm);
this.studentForm.get("rollno")?.setValue(student.rollno);
this.studentForm.get("rollno")?.disable();

this.studentForm.get("firstname")?.setValue(student.name.split(" ")[0]);
this.studentForm.get("firstname")?.disable();

this.studentForm.get("lastname")?.setValue(student.name.split(" ")[1]);
this.studentForm.get("lastname")?.disable();

this.studentForm.get("age")?.setValue(student.age);
this.studentForm.get("age")?.disable();

this.studentForm.get("gender")?.setValue(student.gender);
this.studentForm.get("gender")?.disable();

this.studentForm.get("courseName")?.setValue(student.courseName);
this.studentForm.get("courseName")?.disable();

this.studentForm.get("department")?.setValue(student.department);
this.studentForm.get("department")?.disable();

this.studentForm.get("hobbies")?.setValue(student.hobbies);
this.studentForm.get("hobbies")?.disable();
} 

Closepopup(){
  this.Ref.close();
}

// student = {
//   hobbies:[
//     {hobby:'Arts'}, {hobby:'Music'},{hobby:'Sports'}
//   ]
// }

ngOnInit():void{
 

}

createForm(){
  this.studentForm= this.fb.group({

    rollno: ["",[ Validators.required, Validators.pattern("^[0-9]*$")]],
    firstname: ["", [Validators.required]],
    lastname: ["",[ Validators.required]],
    dob:["",[Validators.required]],
    gender: ["", [Validators.required]],
    courseName:["",[Validators.required]],
    department:["", [Validators.required]],
    hobbies: this.fb.array([]),
    //  hobbies :[""],
     age:[""]
   // myControl:[''],

  });
 
}

get gender(){
    return this.studentForm.get("gender")
}

tableData(event:any){
  this.studentService.students.push(...event);
}


onSubmit() {
  console.log(this.studentForm.value);
  let age;

  if(this.studentForm.get('dob') != null){
    age = ((new Date().getFullYear())-(new Date(this.studentForm.get('dob')?.value).getFullYear()));

  }
  let student={
    "rollno":this.studentForm.get('roll')?.value,
 "name":this.studentForm.get('firstname')?.value+ " "+this.studentForm.get('lastname')?.value,
  "age":age,
  "gender":this.studentForm.get('gender')?.value,
  "courseName":this.studentForm.get('courseName')?.value,
 "department":this.studentForm.get('department')?.value,
 "hobbies":this.studentForm.get('hobbies')?.value
}
this.studentService.students.push(student);

//this.Closepopup();
}

//validations
private validateAllFormFields(formGroup: FormGroup){
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if(control instanceof FormControl){
      control.markAsDirty({onlySelf: true});
    }else if(control instanceof FormGroup ){
      this.validateAllFormFields(control)
    }
  })
}

}
