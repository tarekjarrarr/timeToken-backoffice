
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {PromotionsService} from "../promotions.service";
import { CompaniesService } from '../../companies/companies.service';


@Component({
  selector: 'create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit {
  id:any;
  editMode=false;
  addForm:FormGroup;
  submitted = false;
  valid=false;
  companies=[];
  minDate=new Date();
  
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private promotionsService:PromotionsService,
              private activateRouter:ActivatedRoute,
              private companiesService:CompaniesService){
 
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      category:new FormControl('',[Validators.required]),
      id_company: new FormControl('', [Validators.required]),
      expiration_date:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      cost:new FormControl('',[Validators.required]),
      image:new FormControl('',[])
    });


  }

  ngOnInit() {
    this.id = this.activateRouter.snapshot.params['id'];
    if(this.id){
      this.getPromotionById();
    }
    this.getCompanies();
  }


  getCompanies() {
    this.companiesService.getAllCompanies().subscribe(
      (data:any)=>{this.companies=data},err=>{
        console.log(err)
      }
    )
  }
 
  getPromotionById(){
    this.editMode=true;
    this.promotionsService.getPromotionDetailsById(this.id).subscribe(
      (value:any)=>{
        console.log(value);
        var promotion= {
          "name":value.promotion_name,
          "category":value.category,
          "company":value.company_id,
          "expiration_date":value.expiration_date,
          "description":value.promotion_description,
          "cost":value.cost,
          "image":value.image}
        this.addForm.patchValue(promotion);
      },err=>{
        console.log(err)
      }
    )
  }

  /* getCompanyAdmins(){
    this.promotionsService.getCompanyAdmins(this.id).subscribe(
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
        this.promotionsService.updatePromotion(this.id, this.addForm.value).subscribe(
          data=>{
            alert("company updated successfully")
            this.router.navigate(['pages/promotions'])
          }
        )
      }
    }else{
      this.submitted=true;
      if(this.addForm.valid){
        this.valid=true;
        this.promotionsService.addPromotion(this.addForm.value).subscribe(
          companyId=>{
            alert("Company created successfully")
            this.router.navigate(['pages/promotions'])
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
      this.promotionsService.deleteAdminByid(this.id,admin.id).subscribe(
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

