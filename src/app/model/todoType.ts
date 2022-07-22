export interface IPriority {
  id:number
  name:string
  color?:string

}

export interface ICategory {
  id?:number
  name:string
  icon?:string
}

export interface IList{
  name:string
  date:number
  priority:IPriority
  category:ICategory
  id:number
  status:boolean
}
