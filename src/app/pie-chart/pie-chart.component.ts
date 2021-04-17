import { Component, Input, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() chartData: any;
  config: any;
  minDate: string = '';
  maxDate: string = '';

  date = new FormControl('');

  chartColors = [
    {
      backgroundColor: [
        'rgba(11, 46, 219, 0.9)',
        'rgba(184, 2, 2, 0.9)',
        'rgba(7, 8, 7, 0.9)',
        'rgba(34, 135, 61, 0.9)'
      ],
    },
  ];

  constructor() {
    
  }

  onDateChange(): void{
    this.date.valueChanges.subscribe(date =>{
      date = date.replaceAll('-',' ');
      this.config.pieChartData = [];
      console.log(this.config.pieChartData);
      const data = this.chartData.data.find((day: any) => day.day == date);
      this.config.pieChartData = [data.newCases, data.totalCases, data.totalDeaths, data.totalRecovered],
      console.log(this.config.pieChartData);
    })
  }

  getYesterdaysDate(withDashes: boolean): string{
    const date = new Date();
    const day = date.getDate() > 10 ? date.getDate() - 1 : `0${date.getDate() - 1}`;
    const month = date.getMonth() + 1> 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    if(withDashes) return `${year}-${month}-${day}`
    return `${year} ${month} ${day}`
  }

  setLimitsForInput(){
    this.maxDate = this.getYesterdaysDate(true);
    this.minDate = this.chartData.data[0].day.replaceAll(' ', '-');
    console.log(this.minDate);
  }

  ngOnInit(): void {
    
    this.onDateChange();
    this.setLimitsForInput();

    const data = this.chartData.data.find((day: any) => day.day == this.getYesterdaysDate(false));

    this.config = {
      pieChartData: [data.newCases, data.totalCases, data.totalDeaths, data.totalRecovered],
      pieChartOptions: {
        responsive: true,
        legend:{
          display: true,
        },
      },
      pieChartColors: this.chartColors,
      pieChartLabels: this.chartData.labels,
      pieChartType: 'pie',
    }
  }
  

}
