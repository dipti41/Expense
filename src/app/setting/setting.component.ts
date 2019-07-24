import { Component, OnInit } from '@angular/core';
import { ExpserviceService } from '../services/expservice.service'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  totalbudget: any;
  category_name: any;
  categoryname = [];
  filterName:string;
  category_list:any;  
  constructor(private expservice: ExpserviceService) { }

  ngOnInit() {    
    this.totalbudget = localStorage.getItem('totalBudget'); 
    if(JSON.parse(localStorage.getItem('category_names'))){
    this.category_list = JSON.parse(localStorage.getItem('category_names'));
    }else{
      this.category_list = '';
    }
    
  }

  updateBudget(budget) {
    this.expservice.updatetotalbudget(budget);
    this.ngOnInit();
  }

  addcateggory() {
    console.log(this.filterName);
    let newData = {
      categories: this.filterName
    }
    if(JSON.parse(localStorage.getItem('category_names'))){
    this.categoryname = JSON.parse(localStorage.getItem('category_names'));
    this.categoryname.push(newData);
    }else{
      this.categoryname.push(newData);
    }
    this.expservice.addcategory(this.categoryname);
    
    this.filterName = '';
    this.ngOnInit();
  }
  deletedata(index,row) {
    //console.log(index);
    if (confirm('Are you sure want to delete.')) {
    //this.categoryname.splice(index, 1);    
    row.classList.add("line");
    }    
  }

}
