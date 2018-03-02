import { Component,OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-store-products',
  template: `  <style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    </style>
    <h1>Items</h1>
    <br/>
  <form [formGroup]="myForm" class="container" #productForm="ngForm" (ngSubmit) = "createProduct(productForm.value)">
  <input type = "text" class="form-control" name = "name" ngModel>
    <br/>
    <input type = "number" class="form-control" name = "price" ngModel>
    <input class="btn btn-success" type = "submit" value = "submit">
</form>
    <br/>
    <br/>
    <br/>
    <table>
    <tr>
    <th>Name</th>
    <th>Price</th>
    <th>Created At</th>
    <th>Updated At</th>
    <th>Edit</th>
    <th>Delete</th>
    </tr>

    <tr *ngFor = "let x of this.data">
    <td>{{x.name}}</td>
    <td>{{x.price}}</td>
    <td>{{x.createdAt}}</td>
    <td>{{x.updatedAt}}</td>
    <td><button>Edit</button></td>
    <td><button (click) = "deleteProduct(x._id)">Delete</button></td>
    </tr>

    </table>`
})
export class ProductsComponent {
  data = [];
  c =0;
  cu=JSON.parse(localStorage.getItem("user")).username;

constructor(private http:HttpClient){}

GetProducts(){
  return this.http.get(environment.apiUrl + 'product/getProducts');
}

deleteProduct(ident:string){
  var con = {
    headers:{
      'Content-Type':'application/json'
    }
  }
  this.http.delete('http://localhost:3000/api/product/deleteProduct/'+ident,con).subscribe();
  window.location.reload();



}
createProduct(productForm){
  var con =
         {
             headers:
             {
                  'Content-Type': 'application/json'
              }
         }
   var product = JSON.stringify({
                         name: productForm.name,
                         price: productForm.price,
                         sellerName: this.cu,
                         id:this.c
                     });
  this.c++;
  this.http.post(environment.apiUrl + '/product/createProduct/',product, con).subscribe(
                res => {
                    location.reload();
                }
            )
this.myForm = new FormGroup({
                name: new FormControl(null, Validators.required),
                price: new FormControl(null, Validators.required),
            });
}

ngOnInit(){
  this.GetProducts().subscribe(res=>{
    this.data=res['data'];
  })
}


}
