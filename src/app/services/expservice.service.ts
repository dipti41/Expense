import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpserviceService {
  exps = [];
  percent: any;

  constructor() { }

  getExpenses() {
    let exp = JSON.parse(localStorage.getItem('expenses'));
    return exp;
  }
  updatetotalbudget(budget) {
    localStorage.setItem('totalBudget', budget);
  }
  addcategory(category) {
    //localStorage.removeItem('category_names')
    localStorage.setItem('category_names', JSON.stringify(category));
  }
  calculatepercent(expsum) {
    this.percent = (expsum / parseInt(localStorage.getItem('totalBudget')) * 100);
    return this.percent + '%';
  }
  getexpensedata(data){
    localStorage.setItem('expensedata', JSON.stringify(data));
    //localStorage.removeItem('expensedata');
  }



}
