import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() chartData: any;

  dateForm = new FormGroup({
    firstDate: new FormControl(''),
    secondDate: new FormControl(''),
  });

  config: any;
  chartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(11, 46, 219, 0.9)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(184, 2, 2, 0.9)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(7, 8, 7, 0.9)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(34, 135, 61, 0.9)',
    }
  ]

  minDate: string = '';
  maxDate: string = '';

  constructor() {
    
  }

  restoreDefault(){
    this.config.lineChartData = [];
    this.config.lineChartLabels = [];
    this.setInitialDates();

    this.config.lineChartData = [
        {data: this.chartData.newCases, label: 'New cases'},
        {data: this.chartData.totalCases, label: 'Total cases'},
        {data: this.chartData.totalDeaths, label: 'Total deaths'},
        {data: this.chartData.totalRecovered, label: 'Total recovered'},
    ];
    this.config.lineChartLabels = this.chartData.labels;
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
    if(withDashes) this.chartData.labels[0].replaceAll(' ', '-');
    return this.chartData.labels[0];
  }

  setLimitsForInput(){
    this.maxDate = this.getYesterdaysDate(true);
    this.minDate = this.getFirstDayDate(true);
  }

  getConfig(){
    return {
      lineChartData: [
        {data: this.chartData.newCases, label: 'New cases'},
        {data: this.chartData.totalCases, label: 'Total cases'},
        {data: this.chartData.totalDeaths, label: 'Total deaths'},
        {data: this.chartData.totalRecovered, label: 'Total recovered'},
      ],
      lineChartOptions: {
        responsive: true,
        legend:{
          display: true,

        },
        plugins: {
          zoom: {
            pan: this.getPluginConfig(),
            zoom: this.getPluginConfig(),
          },
        }
      },
      lineChartColors: this.chartColors,
      lineChartLabels: this.chartData.labels,
      lineChartType: 'line',
    }
  }

  getPluginConfig(){
    return {
      enabled: true,
        mode: 'xy',
        rangeMin: {
          x: this.chartData.labels[0],
          y: 0
        },
        rangeMax: {
          x: this.chartData.labels[this.chartData.labels.length - 1],
          y: Math.max(...this.chartData.totalCases),
        },
    }
  }

  onDateChange(){
    this.dateForm.valueChanges.subscribe((date)=>{
      this.config.lineChartData = [];
      this.config.lineChartLabels = [];
      const firstDateNumber = Number(date.firstDate.replaceAll('-',''))
      const secondDateNumber = Number(date.secondDate.replaceAll('-',''))
      let indexes: any = [];
      const newLabels = this.chartData.labels.filter((day: any, index: number)=>{
        const dayNumber = Number(day.replaceAll(' ',''));
        if(dayNumber >= firstDateNumber && dayNumber <= secondDateNumber){
          indexes.push(index);
          return true;
        } 
        return false;
      });
      let newNewCases : any = [], newTotalCases : any = [], newTotalDeaths : any = [], newTotalRecovered: any = [];
      indexes.forEach((index: number) =>{
        newNewCases.push(this.chartData.newCases[index]);
        newTotalCases.push(this.chartData.totalCases[index]);
        newTotalDeaths.push(this.chartData.totalDeaths[index]);
        newTotalRecovered.push(this.chartData.totalRecovered[index]);
      });
      this.config.lineChartData = [
        {data: newNewCases, label: 'New cases'},
        {data: newTotalCases, label: 'Total cases'},
        {data: newTotalDeaths, label: 'Total deaths'},
        {data: newTotalRecovered, label: 'Total recovered'},
      ];
      this.config.lineChartLabels = newLabels;
    });
  }

  setInitialDates(){
    this.dateForm.patchValue({
      firstDate: this.chartData.labels[0].replaceAll(' ', '-'),
      secondDate: this.getYesterdaysDate(true),
    });
  }

  ngOnInit(): void {

    this.config = this.getConfig();

    this.setInitialDates();
    this.setLimitsForInput();

    this.onDateChange();
  }

}
