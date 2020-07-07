import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyWorkerType, MyWorker } from 'src/app/shared/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from 'src/app/shared/worker.service';
import { RouterLink, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/routing/routing';


//отключение кнопки при неправильном заполнении

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})

export class TableWorkersComponent {
  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  myWorkerType = MyWorkerType;

  numb=0;
  type=0;

  Hidden = [];

  @Output() deleteWorker = new EventEmitter<number>();
  
  ChangeForm: FormGroup;

  constructor(public worker:Service,public router: Router) {
  }

  async onInfo(worker){
    await this.worker.set(worker);
    this.router.navigate(["/ChangeForm"]);
  }

  Type(type){
    if (type==0){return "IT"}
    else if (type==1){return "Маркетинг"}
    else if (type==2){return "Журналистика"}
    else if (type==3){return "Инженерия"}
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  

  CheckHidden(id:number){
    for(let i of this.Hidden){
      if (i==id){return false}
    }
    return true
  }

  getIO(n,p){
    let IO=n.substr(1,1)+"."+p.substr(1,1)+".";
    
    
    return IO;
  }
}
