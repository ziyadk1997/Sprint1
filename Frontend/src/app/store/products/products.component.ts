import { Component } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
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
    <button style = "border-radius: 25px; width:300 px ;height:150 px;background-color: #4CAF50;padding: 10px; ">Add Item</button>
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

ngOnInit(){
  this.GetProducts().subscribe(res=>{
    this.data=res['data'];
  })
}

}
