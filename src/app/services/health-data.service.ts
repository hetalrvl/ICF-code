import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthDataService {

  patientData: any = [];
  
  constructor(private httpClient: HttpClient) {}

  // Fetch inital data with 10k records
  fetchData(limit = 10000) {
    // API token
    const token = 's531pn4GysUoyqwya79K1cAlz';
    // API URL, appending limit, token dynamically
    const URL = "https://health.data.ny.gov/resource/gnzp-ekau.json?$where=UPPER(ccs_diagnosis_description) like '%25CANCER%25'&$limit=" + limit + "&$$app_token=" + token;
    // Setting token in header
    const headers = new HttpHeaders().set('X-App-Token',  token);

    // Making get request to server
    return this.httpClient.get(URL, { headers }).pipe(
      map(data => {
        // Storing data in service for re-use
        this.patientData = data;
      })
    );
  }

  getByGender() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      obj[data.gender] = (obj[data.gender] || 0) + 1;
    });
    const labels = Object.keys(obj).map((gender: string) => {
      return (gender === 'F') ? 'Female' : 'Male'
    });
    const values = Object.values(obj);
    return { values,labels };
  }

  getByMethodOfPayment() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      if (data.payment_typology_1) {
        obj[data.payment_typology_1] = (obj[data.payment_typology_1] || 0) + 1;
      }
      if (data.payment_typology_2) {
        obj[data.payment_typology_2] = (obj[data.payment_typology_2] || 0) + 1;
      }
      if (data.payment_typology_3) {
        obj[data.payment_typology_3] = (obj[data.payment_typology_1] || 0) + 1;
      }
    });
    const labels = Object.keys(obj)
    const values = Object.values(obj);
    return { values,labels };
  }

  getByLocation() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      if (data.zip_code_3_digits) {
        obj[data.zip_code_3_digits] = (obj[data.zip_code_3_digits] || 0) + 1;
      }
    });
    const labels = Object.keys(obj)
    const values = Object.values(obj);
    return { values,labels };
  }

  getByAgeGroup() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      if (data.age_group) {
        obj[data.age_group] = (obj[data.age_group] || 0) + 1;
      }
    });
    const labels = Object.keys(obj)
    const values = Object.values(obj);
    return { values,labels };
  }

  getByDischargeYear() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      if (data.discharge_year) {
        obj[data.discharge_year] = (obj[data.discharge_year] || 0) + 1;
      }
    });
    const labels = Object.keys(obj)
    const values = Object.values(obj);
    return { values,labels };
  }

  getByEthinicity() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      if (data.ethnicity) {
        obj[data.ethnicity] = (obj[data.ethnicity] || 0) + 1;
      }
    });
    const labels = Object.keys(obj)
    const values = Object.values(obj);
    return { values,labels };
  }

  getByCountry() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      if (data.hospital_county) {
        obj[data.hospital_county] = (obj[data.hospital_county] || 0) + 1;
      }
    });
    const labels = Object.keys(obj)
    const values = Object.values(obj);
    return { values,labels };
  }
  
  getByRace() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      if (data.race) {
        obj[data.race] = (obj[data.race] || 0) + 1;
      }
    });
    const labels = Object.keys(obj)
    const values = Object.values(obj);
    return { values,labels };
  }

  getByTypeOfAdmission() {
    const obj: any = {};
    this.patientData.forEach((data: any) => {
      if (data.type_of_admission) {
        obj[data.type_of_admission] = (obj[data.type_of_admission] || 0) + 1;
      }
    });
    const labels = Object.keys(obj)
    const values = Object.values(obj);
    return { values,labels };
  }
}
