import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  listData:any[] = [];
  constructor(private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
    this.getListData();
  }
  getListData(){
    this.dataService.currentListRecipes.subscribe(res => {
      this.listData = res;
      console.log(res);
      
    })
  }
  getDetail(id:any){
    this.router.navigateByUrl('/recipes/detail/'+id);
  }
}
