import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  students:any[]=[];
  constructor() { }

  GetStudents(){
  this.students=[
    {
      "rollno":'1',
   "name":'abcefg',
    "age":'19',
    "gender":'male',
    "courseName":'CS3',
   "department":'CSE',
   "hobbies":'arts,music',
  },
  {"status":'',
    "rollno":'2',
   "name":'efg',
    "age":'19',
    "gender":'male',
    "courseName":'CS2',
   "department":'ENTC',
   "hobbies":'arts,music,sports',
  },
  {
    "rollno":'3',
   "name":'xyz',
    "age":'19',
    "gender":'female',
    "courseName":'CS1',
   "department":'CSE',
   "hobbies":'arts',
  },
  {

    "rollno":'4',
   "name":'lmn',
    "age":'19',
    "gender":'male',
    "courseName":'CS1',
   "department":'CSE',
   "hobbies":'arts',
  },
  {

    "rollno":'5',
   "name":'pqr',
    "age":'19',
    "gender":'female',
    "courseName":'CS2',
   "department":'ENTC',
   "hobbies":'arts',
  }


  ]
  }
}
