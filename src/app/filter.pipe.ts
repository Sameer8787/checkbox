import { Pipe, PipeTransform } from '@angular/core';
import { GetStudents } from './app.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(allStudents:GetStudents[], filteredString:string): GetStudents[] {

    if(!allStudents || !filteredString){
        return allStudents;
    }
    return allStudents.filter(student => student.name.toLocaleLowerCase().includes(filteredString.toLocaleLowerCase()))
  }
  // transform(value: any, filterString:string) {
  //   if(value.length === 0 || filterString === ''){
  //     return value;
  //   }
  //   const allStudents = [];
  //   for(const student of value){
  //     if(student['name'] === filterString){
  //       allStudents.push(student);
  //     }
  //   }
  //   return allStudents;
  // }

}
