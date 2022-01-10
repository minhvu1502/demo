import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredientName = '';
  listData:any[] = [];
  quantity = '';
  id = '';
  indexSlected = '';
  isUpdate = false;
  // item: any = {
  //   id: 'c4421475-85bd-432f-be3b-aba8b0132984',
  //   name: 'Nửa tháng trước',
  //   imageUrl:
  //     'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1',
  //   description: '3123',
  //   listIngredient: [
  //     {
  //       ingredientName: '2131',
  //       quantity: 3,
  //     },
  //     {
  //       ingredientName: '2131',
  //       quantity: 3,
  //     },
  //   ],
  // };
  item:any;
  constructor(
    private router: ActivatedRoute,
    private dataService: DataService
  ) {
    this.router.queryParams.subscribe((res) => {
      this.id = res.id;
      this.getDetail(res.id);
    });
  }

  ngOnInit(): void {}
  getDetail(id: any) {
    this.dataService.currentListRecipes.subscribe((res) => {
      var list: any[] = [];
      list = res;
      this.listData = res;
      var model = list.filter((x) => x.id === id);
      if (model !== null) {
        this.item = model[0];
      }
    });
  }
  clearAmount(){
    this.quantity = '';
    this.ingredientName = '';
    this.isUpdate = false;
  }
  DeleteIngredient(){
    if (this.isUpdate) {
      this.item.listIngredient.splice(this.indexSlected, 1);
    this.quantity = '';
    this.ingredientName = '';
    this.listData[Number.parseInt(this.indexSlected)] = this.item;
    this.dataService.setListRecipes(this.listData);
    }
  }
  updateIngredient(){
    this.item.listIngredient[this.indexSlected].ingredientName = this.ingredientName;
    this.item.listIngredient[this.indexSlected].quantity = this.quantity;
    this.listData[Number.parseInt(this.indexSlected)] = this.item;
    this.dataService.setListRecipes(this.listData);
  }
  viewDetail(item:any, index:any){
    this.indexSlected = index;
    this.ingredientName = item.ingredientName;
    this.quantity = item.quantity;
    this.isUpdate = true;
  }
  addIngredient() {
    var model = {
      ingredientName: this.ingredientName,
      quantity: this.quantity,
    };
    this.item.listIngredient.push(model);
    this.listData[Number.parseInt(this.indexSlected)] = this.item;
    this.dataService.setListRecipes(this.listData);
  }
}
