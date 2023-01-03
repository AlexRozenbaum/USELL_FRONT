import { makeAutoObservable } from "mobx";


class Alert {
  title='';
  message='';
  state=false;
  constructor() {
    makeAutoObservable(this);
  }
  set=(title,message,state)=>{
    this.title=title;
    this.message=message;
     this.state=state;
  }

 
} 
const alertStore = new Alert();
export default alertStore;
