import { Pipe, PipeTransform } from '@angular/core';
import { MyWorker } from './worker.model';


@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  res:number = 1;

  transform(workerList, search1,filterID,filterAlf){
    let res=this.sort(workerList);
    let search=this.sort(search1)

    
    

    if (search.group != null){
      res = res.filter(
        function (element){
          return element.group.indexOf(search.group)==0;
        }); 
    }
// Type(type){
//   if (type==0){return "IT"}
//   else if (type==1){return "Маркетинг"}
//   else if (type==2){return "Журналистика"}
//   else if (type==3){return "Инженерия"}
// }
//     console.log(search.type);
// if (search.type != null){
//   res = res.filter(
//     function (element){
//       return element.type.toString().indexOf(search.type.toString())==0;
//     }); 
// }

    

    res=this.filterID(res,filterID);
    res=this.filterAlf(res,filterAlf);
    
    return res;
}

sort(search){
  if ((search.name!=null)&&(search.name.search(" ")!=-1)){
    let bufer=search.name.slice(search.name.search(" ")+1,search.name.length);
    search.name=search.name.slice(0,search.name.search(" "))
    search.surname=bufer;
  }
return search
}

  filterID(workerList,filterID){
  let res=workerList
  console.log(res);
  if (filterID == 1) {
    res.sort(function(a,b){
      return a.id - b.id
    })
  }
  if (filterID == 2){
    res.sort(function(a,b){
      return b.id - a.id
    })
  }
  return res;
  }


  filterAlf(workerList,filterAlf){
    let res=workerList
    
    
    if (filterAlf == 1) {
      res.sort(function(a,b){
        if (a.surname.substr(0,1) > b.surname.substr(0,1)) 
       return -1;
       if (a.surname.substr(0,1) < b.surname.substr(0,1))
        return 1;
        })

    }


    if (filterAlf == 2){
      res.sort(function(a,b){
        if (a.surname.substr(0,1) < b.surname.substr(0,1)) 
    return -1;
    if (a.surname.substr(0,1) > b.surname.substr(0,1))
     return 1;
    })
    
    }
    return res;}

    
    
  // filterA(workerList,filterA){
  //     let Alf=["А","Б","В","Г","Д","Е","Ё","Ж","З","И","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Э","Ю","Я"];
  //     let res=workerList

  //     res.sort(function(a,b){
        
  //       return Alf[MyWorker.surname.substr(1,1)];
  //     })


  // }
  


}
