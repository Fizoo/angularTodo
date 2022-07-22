import {IList} from "../app/model/todoType";

export const list:IList[]=[
  {
    id:1,
    name:'Oleg',
    status:false,
    date:Date.now(),
    category:{
      name:'Job',
      id:1,
      icon:'bi bi-cart3'
    },
    priority:{
      id:1,
      name:'Middle',
      color:'green'
    }
  },
  {
    id:2,
    name:'Sofi',
    status:false,
    date:Date.now(),
    category:{
      name:'Family',
      id:2,
      icon: 'bi bi-people'
    },
    priority:{
      id:1,
      name:'High',
      color:'red'
    }
  },
  {
    id:3,
    name:'Katy',
    status:true,
    date:Date.now(),
    category:{
      name:'Family',
      id:2,
      icon: 'bi bi-people'
    },
    priority:{
      id:1,
      name:'High',
      color:'red'
    }
  }
]

