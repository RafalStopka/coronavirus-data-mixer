import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() chartData: any;

  config: any;
  pluginConfig: any;
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

  constructor() {
    
  }

  ngOnInit(): void {
    this.pluginConfig = {
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
    this.config = {
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
            pan: this.pluginConfig,
            zoom: this.pluginConfig,
          },
        }
      },
      lineChartColors: this.chartColors,
      lineChartLabels: this.chartData.labels,
      lineChartType: 'line',
    }

  }

}
