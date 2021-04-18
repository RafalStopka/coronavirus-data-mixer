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

  firstDate = new FormControl('');
  secondDate = new FormControl('');
  compare = new FormControl('');

  compareDates: boolean = false;

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
    this.firstDate.valueChanges.subscribe(date =>{
      date = date.replaceAll('-',' ');
      this.config.firstPieChartData = [];
      const data = this.chartData.data.find((day: any) => day.day == date);
      this.config.firstPieChartData = [data.newCases, data.totalCases, data.totalDeaths, data.totalRecovered];
    });
    this.secondDate.valueChanges.subscribe(date=>{
      date = date.replaceAll('-',' ');
      this.config.secondPieChartData = [];
      const data = this.chartData.data.find((day: any) => day.day == date);
      console.log(data);
      this.config.secondPieChartData = [data.newCases, data.totalCases, data.totalDeaths, data.totalRecovered];
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

  getFirstDayDate(withDashes: boolean): string{
    if(withDashes) this.chartData.data[0].day.replaceAll(' ', '-');
    return this.chartData.data[0].day;
  }

  setLimitsForInput(){
    this.maxDate = this.getYesterdaysDate(true);
    this.minDate = this.getFirstDayDate(true);
  }

  toggleDateCompareFlag(){
    this.compare.valueChanges.subscribe(value=>{
      this.compareDates = value;
    })
  }

  getConfig(){
    const firstChartData = this.chartData.data.find((day: any) => day.day == this.getYesterdaysDate(false));
    const secondCharttData = this.chartData.data.find((day: any) => day.day == this.getFirstDayDate(false));
    return {
      firstPieChartData: [firstChartData.newCases, firstChartData.totalCases, firstChartData.totalDeaths, firstChartData.totalRecovered],
      secondPieChartData: [secondCharttData.newCases, secondCharttData.totalCases, secondCharttData.totalDeaths, secondCharttData.totalRecovered],
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

  ngOnInit(): void {
    this.firstDate.patchValue(this.getYesterdaysDate(true));
    this.secondDate.patchValue(this.chartData.data[0].day.replaceAll(' ', '-'));
    this.config = this.getConfig();

    this.onDateChange();
    this.setLimitsForInput();
    this.toggleDateCompareFlag();
  }
}
