import { Component, Input, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() chartData: any;
  config: any;

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

  constructor(chartService: ChartsModule) {
    
  }

  ngOnInit(): void {

    const data = this.chartData.data.find((day: any) => day.day == "2021 04 16");
    console.log([data.newCases, data.totalCases, data.totalDeaths, data.totalRecovered])

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
