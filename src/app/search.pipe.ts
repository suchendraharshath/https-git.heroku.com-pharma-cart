import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchTerm:string): any {
    if(!data || !searchTerm){
      return data;
    }
    else{
      return data.filter(x=>x.customername.toLowerCase(). indexOf(searchTerm.toLowerCase())!== -1);
    }
  }

  transform1(data: any[], searchTransactions:string): any {
    if(!data || !searchTransactions){
      return data;
    }
    else{
      return data.filter(x=>x.SnoCustomer.toLowerCase(). indexOf(searchTransactions.toLowerCase())!== -1);
    }
  }



}