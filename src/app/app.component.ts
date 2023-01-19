import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { DialogConfig,DialogRef } from '@angular/cdk/dialog';
import { CallService } from './service/call.service';
import { ViewComponent } from './view/view.component';
import { Sort,MatSort, MatSortable } from '@angular/material/sort';
import{MatTableDataSource} from '@angular/material/table';
import  Swal from 'sweetalert2';



//ddl
interface Student {
  value: string;
  viewValue: string;
}
export interface GetStudents{
  rollno:string;
  name:string;
  age:string;
  gender:string;
  courseName:string;
  department:string;
  hobbies:string;
  checked?:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appBootstrap';

  //form to table
//   @ViewChild(FormComponent) addview ! : FormComponent;

// functionedit(roll:any){
//   this.addview.LoadEditData(roll);
// }

  selectedItems!: string[];

  filteredString!:string;
  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  confirmClicked = false;
  cancelClicked = false;

  sortingParameter:string='';

  sortingDirection:string='';

  filteringType:string='';

  filteredStudents: any[]=[];

  allStudents : any[]=[];

  selcetedStudentIndices:number[]=[];

  constructor (public dialog:MatDialog,
    private studentService:CallService
    )
    {
     // this.allStudents=students.GetStudents();
    }

    // dataSource = new MatTableDataSource<any>;

    // sortDataSource(rollno: string, start: string) {
    //   this.dataSource.data.sort((a, b) => {
    //     return start === 'asc'
    //       ? a[rollno] - b[rollno]
    //       : start === 'desc'
    //       ? b[rollno] - a[rollno]
    //       : a[rollno] - b[rollno];
    //   });
    //   this.dataSource._updateChangeSubscription();
    // }

ngOnInit(): void {
  this.selectedItems = new Array<string>();
  this.studentService.GetStudents();
  this.allStudents= this.studentService.students;
  this.filteredStudents=this.allStudents;

}
//asc desc
//  key:string = 'name';
//  sort: boolean = false;
//  sort1(key: string){
//    this.key = key;
//    this.sort = !this.sort
//  }

//  keyR:string = 'rollno';
//  reverseR: boolean = false;
//  sortR(keyR: string){
//    this.keyR = keyR;
//    this.reverseR = !this.reverseR
//  }

openView(){
  const dialogConfig = new MatDialogConfig();
  let student = this.allStudents.find(student => student.rollno == this.selcetedStudentIndices[0]);
  this.dialog.open (FormComponent,
    { width: '60%', height: '80%' ,
    data: {student:student}

})
  }




//check uncheck
  getStudentRoll(e:any,studentRollno:number)
{
  if(e.target.checked)
  {
    this.selcetedStudentIndices.push(studentRollno);
  }
  else
  {
    let index = this.selcetedStudentIndices.indexOf(studentRollno);
     this.selcetedStudentIndices.splice(index,1);
  }
  console.log(this.selcetedStudentIndices);
}



    //checkbox
    checkAllCheckBox(ev:any){
      if(ev.target.checked){
        this.selcetedStudentIndices = this.allStudents.map(student => student.rollno);
      }
      else{
        this.selcetedStudentIndices = [];
      }
        console.log(this.selcetedStudentIndices);
    }
    isAllCheckBoxChecked(){

      return this.allStudents.length>0 &&  this.allStudents.length == this.selcetedStudentIndices.length;
    }

    // popup
  openDialog(){
  const dialogConfig = new MatDialogConfig();

  this.dialog.open (FormComponent,
    { width: '60%', height: '80%' ,data: "right click"

})
  }

  // ddl
  studentsddl: Student[] = [
    {value: 'rollno', viewValue: 'RollNo'},
    {value: 'firstname', viewValue: 'Firstname'},
    {value: 'lastname', viewValue: 'Lastname'},
    {value: 'name', viewValue: 'Name'},
    {value: 'age', viewValue: 'Age'},
    {value: 'gender', viewValue: 'Gender'},
    {value: 'courseName', viewValue: 'CourseName'},
    {value: 'department', viewValue: 'Department'},
    {value: 'hobbies', viewValue: 'Hobbies'},
  ];

//sort asc desc
sortStudents(sortDirection:string){
  console.log(this.sortingParameter,sortDirection);
  if(sortDirection== "asc"){
    this.filteredStudents.sort((s1:any,s2 :any)=>
    (s1[this.sortingParameter]>s2[this.sortingParameter])?1: ((s2[this.sortingParameter]>s1[this.sortingParameter])?-1:0)
     //return s1[this.sortingParameter]-s2[this.sortingParameter]
    )
  }
  else{
    this.filteredStudents.sort((s1:any,s2 :any)=>
    (s1[this.sortingParameter]>s2[this.sortingParameter])?-1: ((s2[this.sortingParameter]>s1[this.sortingParameter])?1:0)
     //return s1[this.sortingParameter]-s2[this.sortingParameter]
    )
  }
}

//reset filter
clearFilter(){
  console.log('clear');
    
 
  this.sortingDirection='';
  this.sortingParameter='';
  this.filteringType='';
  this.filteredString='';

}


filterStudents(){
  console.log('string');
  if(this.filteredString.length>2){
  if(this.filteringType =='contains'){
    this.filteredStudents=this.allStudents.filter((student:any)=>student.name.includes(this.filteredString));

  }
  else if(this.filteringType =='startswith'){
    this.filteredStudents=this.allStudents.filter((student:any)=>student.name.startsWith(this.filteredString));

  }
 
}
else{
  this.filteredStudents = this.allStudents;
}
}


deleteStudents(){
  Swal.fire({
    title: "Delete Students",
    text: `Do you want to delete selected students?`,
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: `Ok`,
    denyButtonText: `Cancel`,
  }).then((result) => {
    if (result.isConfirmed) {
      this.selcetedStudentIndices.forEach((studentRollno,index)=> {
        console.log(studentRollno, this.selcetedStudentIndices);
        console.log(this.allStudents);
         let indexDelete = this.allStudents.findIndex((student)=>student.rollno == studentRollno);
         console.log(indexDelete);
         this.allStudents.splice(indexDelete,1);

         //this.selcetedStudentIndices.splice(index,1);
      });
      this.selcetedStudentIndices = [];
    }
  });
 // console.log(this.selcetedStudentIndices);

 // console.log(this.allStudents,this.selcetedStudentIndices);
}

refreshStudent(){
 
  this.studentService.GetStudents();
  this.allStudents= this.studentService.students;
  this.filteredStudents=this.allStudents;
}


}
