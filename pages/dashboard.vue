<template lang="">
  <div>
    <line-chart :chart-options="chartOptions" :chart-data="chartData" />
  </div>
</template>
<script>
import { groupBy, orderBy } from "lodash";

export default {
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [],
          },
          // {
          //   label: "Data Two",
          //   backgroundColor: "#797",
          //   data: [12, 30, 40],
          // },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      
    };
  },
  async asyncData({ store }) {
    return {
      transactions: await store.dispatch("transactions/getTransaction"),
    };
  },
  methods: {
    datesTransactions() {
      let index = groupBy(orderBy(this.transactions, "date", "desc"), "date")
      for (let index1 in index){
        this.chartData.labels.push(index1)
      }
    },
    valuesTransactions() {
      let data = groupBy(orderBy(this.transactions, "date", "desc"), "date")
      let values = []
      let latestDate = ''

      for (let index in data){

        let actualDate = index

        for (let index2 in data[index]){
          
          if(actualDate == latestDate){

            values[values.length-1] = values[values.length-1] + data[index][index2]['amount']

          }else{

            values.push(data[index][index2]['amount'])

          }
          
          latestDate = index
        }
      }      
      this.chartData.datasets[0]['data']= values
      return this.chartData.datasets[0]['data']= values
    }
  },
  beforeMount() {
    this.valuesTransactions(),
    this.datesTransactions()
  },
};
</script>
