import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExpserviceService } from '../services/expservice.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  show_form: boolean;
  expenseForm: FormGroup;
  exps = [];
  index: number = null;
  totalbudget: any;
  totalexpense: any = 0;
  percentage: any;
  category_list = [];
  backdata = [];
  disabledbutton: boolean = false;


  constructor(private fb: FormBuilder,
    private expservice: ExpserviceService) { }

  ngOnInit() {
    this.show_form = false;
    this.totalbudget = localStorage.getItem('totalBudget');

    this.category_list = JSON.parse(localStorage.getItem('category_names'));

  }
  showform(index) {
    this.show_form = true;
    //console.log(index);
    if (index != undefined) {
      //console.log(this.exps[index]);
      this.expenseForm.patchValue({
        record_id: index,
        category: this.exps[index].category,
        item: this.exps[index].item,
        amount: this.exps[index].amount,
        expense_date: this.exps[index].datee
      });
    } else {
      this.expenseForm = this.fb.group({
        record_id: [''],
        category: ['', Validators.required],
        item: ['', Validators.required],
        amount: ['', Validators.required],
        expense_date: ['']
      });
    }
  }
  onSubmit(category?: string, item?: string, amount?: any, date?: string, record_id?: any) {

    let newData = {
      category: category,
      item: item,
      amount: amount,
      datee: date
    }
    if (record_id != '') {
      //console.log(this.exps);
      //this.expservice.updatedata(record_id,newData);
      // let start_index = record_id
      // let number_of_elements_to_remove = 4;
      // let removed_elements = this.exps.splice(start_index, number_of_elements_to_remove, newData);

      this.exps.splice(record_id, 1, newData)
      //let newArr = [...this.exps.slice(0, record_id - 1), newData, ...this.exps.slice(record_id)];
      
      this.sumofamount();
      console.log(this.exps);
      
    } else {
      this.exps.push(newData);
      //this.expservice.getexpensedata(newData);
      this.sumofamount();
    }
    this.ngOnInit();
    //console.log(this.exps);    
  }
  deletedata(index) {
    this.disabledbutton = true;
    //console.log(index);
    if (confirm('Are you sure want to delete.')) {

      this.backdata.push(this.exps[index]);
      this.exps.splice(index, 1);

      this.sumofamount();
    }
    //this.ngOnInit();
  }
  sumofamount() {
    this.totalexpense = 0;
    for (var i = 0; i < this.exps.length; i++) {
      this.totalexpense += parseInt(this.exps[i].amount);
    }
    this.percentage = this.expservice.calculatepercent(this.totalexpense);
    //console.log(this.percentage);

  }
  undoexpense() {
    this.disabledbutton = false;
    this.exps = this.exps.concat(this.backdata);
  }

}
