import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit{

  @Input() data: any;

  chart: any;
  dta1 = [];
  labelData1 = [];
  dta2 = [];
  labelData2 = [];


  ngOnInit() {
    console.log(this.data.country.buckets);

    for (let index = 0; index < this.data.country.buckets.length; index++) {
      this.dta1.push(this.data.country.buckets[index].key);
      this.labelData1.push(this.data.country.buckets[index].doc_count);
    }

    for (let index = 0; index < this.data.language.buckets.length; index++) {
      this.dta2.push(this.data.language.buckets[index].key);
      this.labelData2.push(this.data.language.buckets[index].doc_count);
    }
    console.log(this.labelData2);
    console.log(this.dta2);


    this.renderChart();
    this.renderChartIdioma();

}

  renderChart(){
    let c = <HTMLCanvasElement> document.getElementById("canvas")
    let ctx = c.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.dta1,
          datasets: [{
            label: '',
            data: this.labelData1,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
      }
      });

  }

  renderChartIdioma(){
    let c = <HTMLCanvasElement> document.getElementById("language")
    let ctx = c.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.dta2,
          datasets: [{
            label: '',
            data: this.labelData2,
            borderWidth: 1
          }]
        },

        options: {
          responsive: true
      }
      });

  }
}
