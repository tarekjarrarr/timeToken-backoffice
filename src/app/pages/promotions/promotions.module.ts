import { NgModule } from "@angular/core";
import { DetailsPromotionComponent } from "./details-promotion/details-promotion.component";
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';

import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, PromotionsRoutingModule } from "./promotions-routing.module";
import { NgxPaginationModule } from "ngx-pagination";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialogModule } from "@angular/material";



@NgModule({
    imports:[
        ThemeModule,
        PromotionsRoutingModule,
        NgxPaginationModule,
        MatSlideToggleModule,
        MatDialogModule
    ],
    declarations:[
        ...routedComponents,
        DetailsPromotionComponent,
        CreatePromotionComponent,
    ],
    entryComponents:[DetailsPromotionComponent]
})

export class PromotionsModule{ }




