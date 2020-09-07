import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL, TEST_ID } from '../../app.constant';
import { Company } from './company.model';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class CompaniesService {
    private userUrl: string = API_URL+'user';
    private adminUrl: string= API_URL+'admin';
    private companyUrl:string=API_URL+'company';
    private oauthUrl: string = "/";

    constructor(private http: HttpClient) {
    }

     getAllCompanies():Observable<Company[]>{
       return this.http.get<Company[]>(this.companyUrl+'/getAllCompanies');
    }; 

    getCompanyById(id: number): any {
        return this.http.get<any>(this.companyUrl+'/getCompanyById?id=' + id);
      }
    
      addCompany(company: Object): Observable<Object> {
        return this.http.post(this.companyUrl+`/createCompany`,JSON.stringify(company), {responseType: 'text'});
      }
    
      deleteCompany(id: number): Observable<Object> {
        return this.http.post(this.companyUrl + '/deleteCompany?id='+id, {responseType: 'text'});
      }
      
    
      updateCompany(id: number, company: Object): Observable<Object> {
        return this.http.post(this.companyUrl+'/updateCompany?id='+id, company, {responseType: 'text'});
      }

      


  }