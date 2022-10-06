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
            label: "Geral",
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
      filter: {
        categoryId: 1
      },
      filro: ''
      
    };
  },
  async asyncData({ store }) {
    let transactionsJson = await store.dispatch("transactions/getTransaction")
    return {
      transactions: groupBy(orderBy(transactionsJson, "date", "desc"), "date")
    };
  },
  methods: {
    datesTransactions(data) {
      for (let index in data){
        this.chartData.labels.unshift(index)
      }
    },
    valuesTransactions(data) {
      let values = []
      for (let index in data){
        for (let index2 in data[index]){
          if(index == latestDate){
            values[0] += parseInt(data[index][index2]['amount'])
          }else{
            values.unshift(data[index][index2]['amount'])
          }
          let latestDate = index
        }
      }      
     return values
    },
    onFilter(filter) {
      this.$store
        .dispatch("transactions/getTransaction", filter)
        .then((response) => {
          return response;
        });
    },
  },
  beforeMount() {
    this.onFilter(this.filter)
    this.valuesTransactions(this.transactions),
    this.datesTransactions(this.transactions)
  },
};
</script>
