import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
//    item:any = {
//     "id": "c4421475-85bd-432f-be3b-aba8b0132984",
//     "name": "Nửa tháng trước",
//     "imageUrl": "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1",
//     "description": "3123",
//     "listIngredient": [
//         {
//             "ingredientName": "2131",
//             "quantity": 3
//         },
//         {
//           "ingredientName": "2131",
//           "quantity": 3
//       }
//     ]
// };
listData:any[] = [];
item:any;
   id:any = '';
  constructor(private dataService:DataService, private activeRoute:ActivatedRoute, private router:Router) {
    this.activeRoute.params.subscribe(res=> {
      this.id = res.id;
    this.getDetail(this.id);
    });   }
  ngOnInit(): void {
  }
  goToShoppingList(id:any){
    this.router.navigateByUrl('/shopping-list?id='+id);
  }
  goToEdit(id:any){
    this.router.navigateByUrl('/recipes/edit?id='+id);
  }
  deleteItem(id:any){
    var index = this.listData.findIndex(x=>x.id === id);
    this.listData.splice(index, 1);
    this.dataService.setListRecipes(this.listData);
    // this.router.navigateByUrl('/recipes');
  }
  getDetail(id:any){
    this.dataService.currentListRecipes.subscribe(res => {
      var list:any[] = [];
      this.listData = res;
      list = res;
      var model = list.filter(x=> x.id === id);
      if (model !== null) {
        this.item = model[0];
      }
    })
  }
}
