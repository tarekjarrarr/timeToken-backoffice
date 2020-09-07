import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompaniesService} from "../companies.service";


@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreatecompanyComponent implements OnInit {

  id:any;
  editMode=false;
  addForm:FormGroup;
  submitted = false;
  valid=false;

  /* admins=[];
  public companyQrCode: string = null; */
  
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private companiesService:CompaniesService,
              private activateRouter:ActivatedRoute){
 
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      category:new FormControl('',[Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', []),
      adress: new FormControl('', []),
      country_code: new FormControl('', []),
      phone: new FormControl('', []),
      description:new FormControl('',[])
    });


  }

  ngOnInit() {
    this.id = this.activateRouter.snapshot.params['id'];

    
    if(this.id){
      this.getCompanyById();
      /*this.getCompanyAdmins();*/
    }

  }
 
  getCompanyById(){
    this.editMode=true;
    this.companiesService.getCompanyById(this.id).subscribe(
      (value:any)=>{
    /*this.companyQrCode = value.code;*/
        this.addForm.patchValue(value);
      },err=>{
        console.log(err)
      }
    )
  }

  /* getCompanyAdmins(){
    this.companiesService.getCompanyAdmins(this.id).subscribe(
      (data:any)=>{
        this.admins=data;
      },err=>{
        console.log(err)
      }
    )
  } */

  get formvalidate(){
    return this.addForm.controls;
  }
  
  onSubmit(){
    
    if(this.id){
      this.submitted=true;
      if(this.addForm.valid){
        this.valid=true;
        this.companiesService.updateCompany(this.id, this.addForm.value).subscribe(
          data=>{
            alert("company updated successfully")
            this.router.navigate(['pages/companies'])
          }
        )
      }
    }else{
      this.submitted=true;
      if(this.addForm.valid){
        this.valid=true;
        this.companiesService.addCompany(this.addForm.value).subscribe(
          companyId=>{
            alert("Company created successfully")
            /* this.router.navigate(['pages/company/'+companyId+'/create-admin']) */
            this.router.navigate(['pages/companies'])
          },err=>{
            console.log(err);
          }
        )
      }
    }
  }


  /* createAdmin(){
    console.log("createAdmin");
    this.router.navigate(['pages/company/',this.id,'create-admin']);
  } */


  /* updateAdmin(admin:any):void{
    this.router.navigate(['pages/company/',this.id,'create-admin',admin.id]);
  } */


  /* deleteAdminByid(admin:any):void {
    if(confirm("Are you sure you want to delete this Admin?")) {
      this.companiesService.deleteAdminByid(this.id,admin.id).subscribe(
        data=>{
          if(data=="success"){
            this.admins=this.admins.filter(r=>r !==admin)
            alert("Admin deleted successfully");
          }else{
            alert("You could not delete Admin ");

          }
          this.router.navigate(['pages/company/',this.id,'edit']);

        },err =>{
          console.log(err);
        }
      )}
  }; */

}

