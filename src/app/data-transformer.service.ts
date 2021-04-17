import { Injectable } from '@angular/core';
import * as ISO from '../../node_modules/i18n-iso-countries';
import data from '../../node_modules/i18n-iso-countries/langs/en.json';

@Injectable({
  providedIn: 'root'
})
export class DataTransformerService {

  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  constructor() {
    ISO.registerLocale((data));
  }

  prepareDataForChart(rawData: any[]){
    let uniqueDays: any = [];
    return rawData.filter((day: any)=>{
      day.day = (day.day).replaceAll('-',' ');
      if(!uniqueDays.includes((day.day).replaceAll('-',' '))){
        uniqueDays.push(day.day);
        return true;
      }
      return false;
    }).map((day: any)=>{
      return {
        day: day.day,
        casesPerMillion: Number(day.cases['1M_pop']) | 0,
        deathsPerMillion: Number(day.deaths['1M_pop']) | 0,
        testsPerMillion: Number(day.tests['1M_pop']) | 0,
        newCases: Number((day.cases.new)?.replace('+','')) | 0,
        newDeaths: Number((day.deaths.new)?.replace('+','')) | 0,
        totalCases: day.cases.total | 0,
        totalDeaths: day.deaths.total | 0,
        totalTests: day.tests.total | 0,
        totalRecovered: day.cases.recovered | 0,
        activeCases: day.cases.active | 0,
      }
    })
    .reverse();
  }

  prepareDataForCountryList(rawData: any[]){
    return rawData.filter((country: any)=> country.population != undefined)
    .sort((first: any, second: any)=> second.cases.active - first.cases.active)
    .map((country: any)=>{
      return {
        name: (country.country).replaceAll('-',' '),
        population: (country.population).toLocaleString(),
        activeCases: (country.cases.active)?.toLocaleString(),
        totalCases: (country.cases.total)?.toLocaleString(),
        totalRecovered: (country.cases.recovered)?.toLocaleString(),
        totalDeaths: (country.deaths.total)?.toLocaleString(),
        totalTests: (country.tests.total)?.toLocaleString(),
        infectionRisk: country.cases.active * 1000 / country.population,
        ISO: ISO.getAlpha2Code((country.country).replaceAll('-',' '), 'en'),
      }
    });
  }

  prepareConfigForPieChart(countryData: any[]){
    const data = countryData.map((day: any)=>{
      return {
        day: day.day,
        newCases: day.newCases,
        totalCases: day.totalCases,
        totalDeaths: day.totalDeaths,
        totalRecovered: day.totalRecovered,
      }
    });
    return {
      data: data,
      labels: ['New cases', 'Total cases', 'Total deaths', 'Total recovered'],
      ready: true,
    }
  }

  prepareConfigForLineChart(countryData: any[]){
    const newCases: number[] = [];
    const totalCases: number[] = [];
    const totalDeaths: number[] = [];
    const totalRecovered: number[] = [];
    const labels: string[] = [];
    countryData.forEach((day: any)=>{
      newCases.push(day.newCases);
      totalCases.push(day.totalCases);
      totalDeaths.push(day.totalDeaths);
      totalRecovered.push(day.totalRecovered);
      labels.push(day.day);
    });
    return {
      newCases,
      totalCases,
      totalDeaths,
      totalRecovered,
      labels,
      ready: true
    }
  }
}
