import { Component, OnInit } from '@angular/core';
import {
  MyWorker,
  MyWorkerType
 } from 'src/app/shared/worker.model';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Service } from 'src/app/shared/worker.service';
import { Router } from '@angular/router';

interface ChangeForm {
  name: string;
  surname: string;
  patronimic:string;
  date:number;
  email:string;
  group:string;
}

@Component({
  selector: 'app-change-form',
  templateUrl: './Change.html',
  styleUrls: ['./Change.css']
})
export class ChangeFormComponent implements OnInit {
  workers: MyWorker[]=[];
  myWorkerType = MyWorkerType;

  numb=0;

  OpenWorker:MyWorker;

  ChangeName;
  ChangeSurname;
  ChangePatronimic;
  CangeAge;
  CangeDate;
  CangeEmail;
  CangeTelephone;
  type;
  CangeGroup;

  onChange=false;
  
  ChangeForm: FormGroup;
  users: ChangeForm[]=[];

  constructor(public worker:Service,public router: Router) { 
    this.ChangeForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      surname: new FormControl(null,[Validators.required]),
      patronimic: new FormControl(null,[Validators.required]),
      date: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
      group: new FormControl(null,[Validators.required]),
    });
    this.OpenWorker=this.worker.get();
    this.getData();
  }


  async getData() {
    try {
      this.workers = await this.worker.getData();
    } catch (error) {
      console.log(error)
    }
  }

  async onDeleteById(id: number) {
    try {
      await this.worker.onDeleteById(id);
      this.getData();
    } catch (error) {
      console.log(error);
    }
    this.router.navigate(["/WorkerBD"]);
  }

  async onChangeById(worker){
    try {
      await this.worker.changeWorker(worker);
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {}

  Type(type){
    if (type==0){return "IT"}
    else if (type==1){return "Маркетинг"}
    else if (type==2){return "Журналистика"}
    else if (type==3){return "Инженерия"}
  }

  onChangeWorker(){
    this.ChangeName=this.OpenWorker.name;
    this.ChangeSurname=this.OpenWorker.surname;
    this.ChangePatronimic=this.OpenWorker.patronimic;
    this.CangeDate=this.OpenWorker.date;
    this.CangeEmail=this.OpenWorker.email;
    this.CangeTelephone=this.OpenWorker.telephone;
    this.type=this.OpenWorker.type;
    this.CangeGroup=this.OpenWorker.group;
    

    this.onChange=true;
  }

  back(){
    this.onChange=false;
  }

  

  

  onSubmitChanges() {
    
      this.onChange=false;
      let push:MyWorker=this.ChangeForm.value;
      push.id=this.OpenWorker.id;
      push.type=this.type;
      push.group=this.CangeGroup;
      push.telephone=this.CangeTelephone;
      this.onChangeById(push)
      this.OpenWorker=push;
      this.ChangeForm.reset();
    
      
  }

}
