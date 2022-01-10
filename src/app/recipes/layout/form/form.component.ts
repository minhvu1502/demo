import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form:FormGroup;
  listIngredient:any[] = [];
  listData:any[] = [];
  id = '';
  item:any;
  constructor(private fb: FormBuilder, private dataService:DataService, private router:Router, private activeRoute: ActivatedRoute) {
    this.form = this.fb.group({
      name: [{ value: null, disabled: false }, [Validators.required]],
      imageUrl: [{ value: null, disabled: false }, [Validators.required]],
      description: [{ value: null, disabled: false }, [Validators.required]],
    });
    this.activeRoute.queryParams.subscribe(res => {
      if (res.id !== null && res.id !== undefined && res.id !== '') {
        this.id = res.id;
        this.getDetail(this.id);
      }else{
        this.getListData();
      }
    }) 
  }
  ngOnInit(): void {
  }
  getListData(){
    this.dataService.currentListRecipes.subscribe(res =>{
      this.listData = res;
    })
  }
  getDetail(id:any){
    this.dataService.currentListRecipes.subscribe(res => {
      var list:any[] = [];
      this.listData = res;
      list = res;
      var model = list.filter(x=> x.id === id);
      if (model !== null) {
        this.item = model[0];
        this.form.controls.name.setValue(model[0].name);
        this.form.controls.imageUrl.setValue(model[0].imageUrl);
        this.form.controls.description.setValue(model[0].description);
        this.listIngredient = model[0].listIngredient;
      }
    })
  }
  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
  save(){
    if (this.id === '') {
      var model = {
        id: this.generateUUID(),
        name: this.form.controls.name.value,
        imageUrl: this.form.controls.imageUrl.value,
        description: this.form.controls.description.value,
        listIngredient: this.listIngredient
      }
      this.listData.push(model);
    }else{
      var model = {
        id: this.id,
        name: this.form.controls.name.value,
        imageUrl: this.form.controls.imageUrl.value,
        description: this.form.controls.description.value,
        listIngredient: this.listIngredient
      }
      var index = this.listData.findIndex(x=>x.id === this.id);
      this.listData[index] = model;
    }
    this.dataService.setListRecipes(this.listData);
    this.router.navigateByUrl('recipes');
  }
  addIngredient(){
    var model = {
      ingredientName: ' ',
      quantity: ''
    }
    this.listIngredient.push(model);
  }
  removeIngredient(index:any){
    this.listIngredient.splice(index, 1);
  }
}
