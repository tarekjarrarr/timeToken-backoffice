import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ActivitiesRoutingModule, routedComponents } from './activities-routing.module';
import { DetailsActivityComponent } from './details-activity/details-activity.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatListModule} from '@angular/material/list';
import { ActivitiesComponent } from './activities.component';
import { MatDialogModule, MatDialogContent, MatDialogTitle } from '@angular/material';
import { VerifyActivityComponent } from './verify-activity/verify-activity.component';


@NgModule({
  imports: [
    ThemeModule,
    ActivitiesRoutingModule,
    NgxPaginationModule ,
    MatListModule,
    MatDialogModule,
  ],
  declarations: [
    ...routedComponents,
    DetailsActivityComponent,
    VerifyActivityComponent
  ],
  entryComponents:[VerifyActivityComponent,DetailsActivityComponent]
})

export class ActivitiesModule {  
}

