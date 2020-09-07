import { Component, OnInit } from '@angular/core';
import { Promotion } from '../../promotions/promotion.model';
import { Company } from '../company.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../companies.service';
import { PromotionsService } from '../../promotions/promotions.service';

@Component({
  selector: 'details-company',
  templateUrl: './details-company.component.html',
  styleUrls: ['./details-company.component.scss']
})
export class DetailsCompanyComponent implements OnInit {
  
  company:Company;
  promotions:Promotion[]=[];
  id:number;
  

  constructor(private router:Router, private companyService:CompaniesService,private promotionsService:PromotionsService,private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id=this.activateRoute.snapshot.params['id'];
    this.getCompanyById(this.id);
    this.getPromotionsByCompanyId(this.id)
  }

  getCompanyById(companyId: number) {
    this.companyService.getCompanyById(companyId).subscribe(
      data=>{
        console.log("company:",data);      
        this.company=data;
      },
      error=>{
        console.log("error"+error);
      }
    )
  }
  

  getPromotionsByCompanyId(companyId:number) {
    this.promotionsService.getPromotionsByCompanyId(companyId).subscribe(
      data=>{
        console.log("promotions :",data);      
        this.promotions=data;
      },
      error=>{
        console.log("error "+error);
      });
  }

  goManageCompanies(){
    this.router.navigate(['/pages/companies']);
  }

  goDetailsPromotion(promotionId:number){
    this.router.navigate(['pages/promotions',promotionId, 'details']);  }

  delete(promotionId :any){
    console.log(promotionId);
     this.promotionsService.deletePromotion(promotionId).subscribe(
      data=>{
        window.location.reload();
      },err=>{
        console.log(err);
      }
     ); 
  }

  update(promotionId:any){
    this.router.navigate(['pages/promotions',promotionId,'edit'])
  } 

}
