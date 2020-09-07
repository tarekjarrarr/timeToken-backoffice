import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {Router} from "@angular/router";
import { UserService } from './user.service';
import { Subject } from 'rxjs';
import {LoginService} from "./login.service";
import { User } from './user.model';
import { checkAndUpdatePureExpressionInline } from '@angular/core/src/view/pure_expression';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
pageActuel: number =1;
users:User[]=[];
dataTable: any;
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
isAvailable = false;
ref:number;
role:string="";
nom:"";
prenom:"";
email:"";
adresse:"";
refCommercial:number;
salaire:"";
err:number;
map:Map<string,any[]>=new Map();
public selectedVal: string;
  
constructor(private router: Router,
              private userService:UserService,
              private loginServer:LoginService) {
    //this.role=this.loginServer.currentUserValue.user.role;
    //this.ref=this.loginServer.currentUserValue.user.ref;


  }


  ngOnInit() {
    this.selectedVal ='Active';
      this.isAvailable = false;
      this.getAllUsers();
  }

  public onValChange(val: string) {
    this.selectedVal = val;
  }
  
getAllUsers(){
  this.userService.getAllUsers().subscribe(
    data=>{
      this.users=data;
      /* data.forEach((user:any) => {
        this.map.set(user.user.id,user.role)
      }); */
      this.dtTrigger.next();
    },err=>{
      console.log(err);
    })
}

  
  create():void{
    this.router.navigate(['/pages/user/create']);
  } 

  deleteUser(user:User):void {
    if(confirm("are you sure you want to delete user :'"+user.firstname+" "+user.lastname+" '?")) {
    this.userService.deleteUser(user.id).subscribe(
      data=>{
        console.log(data);
        window.location.reload();
      },err =>{
        console.log(err);
      }
    )}
  };
  
  
    

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  viewProfile(UserId:any){
    this.router.navigate(['pages/user',UserId, 'details']);
  }

  
  displayScreeningtResults(UserId:any){
    this.router.navigate(['pages/user',UserId, 'test-results']);
  }


  isAdmin(){

  };

  chooseAdmin(e,UserId){
    const classList = e.target.classList;
    const classes = e.target.className;
  
    if(classes.includes('fa-toggle-off')){
      classList.remove('fa-toggle-off');
      classList.add('fa-toggle-on');
         /* this.map.get(UserId).push('admin');
         this.addRole(UserId,role.id); */
     }else{
      classList.remove('fa-toggle-on');
      classList.add('fa-toggle-off');
      /* var selectedRolesList=this.map.get(UserId).filter(r=>r.id !==role.id)
      this.map.set(UserId,selectedRolesList);
      this.removeRole(UserId,role.id); */
       }     
  }

  desactivateUser(){}
  

  /* addRole(UserId,roleId){
    this.userService.addRoleToUser(UserId,roleId).subscribe(
      data=>console.log("data "+data),
      err=> console.log("error "+err) 
    );
  } */

 /*  removeRole(UserId,roleId){
    this.userService.removeRoleFromUser(UserId,roleId).subscribe(
      data=>console.log("data "+data),
      err=> console.log("error "+err) 
    );
  } */
 
}
