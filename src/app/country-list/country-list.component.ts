import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { DataTransformerService } from '../data-transformer.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  countryList: any[] = [];
  icon = faInfoCircle;
  modalVisible = false;
  listGreyDisplay = 'none';

  onModalOpen(){
    this.modalVisible = true;
    this.listGreyDisplay = 'block';
  }

  onModalClosed(){
    this.modalVisible = false;
    this.listGreyDisplay = 'none';
  }
  
  constructor(private apiService: ApiService, private dataTransformer: DataTransformerService) {
    this.apiService.getDataFromAPI('statistics').subscribe((data: any)=>{
      this.countryList = this.dataTransformer.prepareDataForCountryList(data.response);
    })
   }

   getImageURL(code: string){
     return code === undefined ? 'https://flagcdn.com/us-al.svg' :`https://flagcdn.com/${code.toLowerCase()}.svg`;
   }
   getDangerColor(risk: number){
     const color = risk > 10 ? 'red' : risk > 5 ? 'orange' : risk > 1 ? 'yellow' : 'green';
     return color;
   }

  ngOnInit(): void {
  }

}
