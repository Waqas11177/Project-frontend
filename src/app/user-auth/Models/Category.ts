export interface Category{
    id:number;
    name:string;
    childCatName:string
}


export class CreateCategory{
    public name!: string;
    public childCatName!: string;
    public type!:string;
}

export interface LoginResponse {
    access_token: string;
  }