import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { DataTransformerService } from '../data-transformer.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  countryName: string | null = '';
  ISO: string | null = '';
  lineChartData: any = [];
  pieChartData: any = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private dataTransformer: DataTransformerService) {
    this.countryName = this.route.snapshot.paramMap.get('country');
    this.apiService.getDataFromAPI(`history?country=${this.countryName}`).subscribe((data: any)=>{
      const countryData = this.dataTransformer.prepareDataForChart(data.response);
      this.lineChartData = this.dataTransformer.prepareConfigForLineChart(countryData);
      this.pieChartData = this.dataTransformer.prepareConfigForPieChart(countryData);
    });
  }


  ngOnInit(): void {
  }

}
