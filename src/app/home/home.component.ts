import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HealthDataService } from '../services/health-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  data: any;
  pie: any = {
    data: [
      {
        values: [],
        labels: [],
        type: 'pie'
      }
    ],
    layout: {width: '100%', height: '100%', title: ''}
  };

  category = '';
  loading = true;
  error = false;

  constructor(private healthData: HealthDataService) {
    this.initData();
  };

  // Get intial data and also helps when retrying
  initData() {
    this.healthData.fetchData()
      .subscribe(data => {
        this.error = false;
        this.loading = false;
      }, err => {
        this.loading = false;
        this.error = true;
      });
  }

  /*
    Set values and labels and title through this function
  */
  setData (values: string[], labels: string[], title: string) {
    this.pie = {
      data: [
        {
          values,
          labels,
          type: 'pie'
        }
      ],
      layout: {width: '100%', height: 500, title}
    };
  }

  /*
    Handle dropdown changes:
    Based on the selected item in the dropdown when the "Update chart" button
    gets clicked `handleChange` will execute and invokes appropriate method from service
  */
  handleChange() {
    let pieDetails: any;
    switch(this.category) {
      case 'payment':
        pieDetails = {...this.healthData.getByMethodOfPayment(), title: 'Categorized by payment'};
        break;
      case 'age_group':
        pieDetails = {...this.healthData.getByAgeGroup(), title: 'Categorized by age group'};
        break;

      case 'zip_code_3_digits':
        pieDetails = {...this.healthData.getByLocation(), title: 'Categorized by 3 digit Zip code'};
        break;

      case 'gender':
        pieDetails = {...this.healthData.getByGender(), title: 'Categorized by Gender'};
        break;

      case 'discharge_year':
        pieDetails = {...this.healthData.getByDischargeYear(), title: 'Categorized by discharge year'};
        break;

      case 'ethinicity':
        pieDetails = {...this.healthData.getByEthinicity(), title: 'Categorized by ethinicity'};
        break;
 
      case 'country':
        pieDetails = {...this.healthData.getByCountry(), title: 'Categorized by Country'};
        break;

      case 'race':
        pieDetails = {...this.healthData.getByRace(), title: 'Categorized by race'};
        break;

      case 'type_of_admission':
        pieDetails = {...this.healthData.getByTypeOfAdmission(), title: 'Categorized by Type of admission'};
        break;
    }
    this.setData(pieDetails.values, pieDetails.labels, pieDetails.title);
  }

}
