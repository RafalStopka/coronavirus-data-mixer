import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() chartData: any;
  config: any;
  minDate: string = '';
  maxDate: string = '';

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: any[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [];

  constructor() { }
  
  getConfig(){
    this.barChartData = this.chartData.data;
    this.barChartLabels = this.chartData.labels;
  }

  ngOnInit(): void {
    this.config = this.getConfig();
  }

}
