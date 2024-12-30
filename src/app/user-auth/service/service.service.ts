import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signup } from '../Models/SignUp';
import { login } from '../Models/Login';
import { Category, CreateCategory } from '../Models/Category';
import { ParentCategory } from '../Models/ParentCategory';
import { ChildCategory } from '../Models/ChildCategory';
import { Item } from '../Models/item';
import { Observable, of } from 'rxjs';
import { ItemViewModel } from '../Models/ItemRecord';


  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

@Injectable({
  providedIn: 'root'
})
  
export class ServiceService {
  
  urls = "https://localhost:44335"

  

  constructor(private http: HttpClient) {
  }
  saveusers(data: Signup) {
    console.warn(data);
    return this.http.post(this.urls + "/Users", data);
  }

  login(data: login) {
    console.warn(data);
    return this.http.post(this.urls + "/api/Login/Login", data);
  }

 
    getcategory(): Observable<Category[]> {
      debugger;
      
      if (token) {
        debugger;
    
        return this.http.get<Category[]>(this.urls + "/api/Categories/GetCategory", {headers });
      } else {
        console.log('No token found');
        return new Observable<Category[]>(); 
      }
    }
  
  GetParentCategory() {
    return this.http.get<ParentCategory[]>(this.urls + "/api/Categories/GetParentCategory",{headers })
  }

GetMasterdata(id: number): Observable<any> {

  return this.http.get<any>(`${this.urls}/api/Items/MasterItemRecord?id=${id}`);
}
GetDetaildata(id: number): Observable<any> {

  return this.http.get<any>(`${this.urls}/api/Items/DetailItemRecord?id=${id}`);
}


  GetChildCategory(item: string) {
    return this.http.get<ChildCategory[]>(this.urls + "/api/Categories/GetChildCategory?name=" + item)

  }

  updateCategory(name: string,id:number) {
    debugger;
    const data = { name,id};
    return this.http.post(this.urls + "/api/Categories/UpdateCategory", data);
  }
  createchildCategory( name: string, childCatName: string,type: string) {
    debugger;
    const data = { name, childCatName,type };
    return this.http.post(this.urls + "/api/Categories/Category", data);
  }

  CreateCategory(data: CreateCategory) {
    return this.http.post(this.urls + "/api/Categories/Category", data);
  }

  ItemRecord(data: ItemViewModel) {
    debugger;
    // Make sure the data is being sent as expected
    console.log("Sending data to API:", data);
    return this.http.post(this.urls + "/api/Items/ItemRecord", data);
  }

  private items: Item[] = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', description: 'Description of Item 2' },
    { id: 3, name: 'Item 3', description: 'Description of Item 3' },
  ];
  getItems(): Observable<Item[]> {
    return of(this.items); // simulate HTTP request
  }
  getItemById(id: number): Observable<Item | undefined> {
    const item = this.items.find(i => i.id === id);
    return of(item);
  }
}
