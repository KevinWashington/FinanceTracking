<template lang="">
  <div>
    <line-chart :chart-options="chartOptions" :chart-data="chartData" />

    {{ this.chartData.labels }}
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
            data: [40, 20, 12],
          },
          {
            label: "Data Two",
            backgroundColor: "#797",
            data: [12, 30, 40],
          },
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
    transactionGrouped() {
      return groupBy(orderBy(this.transactions, "date", "desc"), "date")  
    },
    addLabels() {
      for (var i in this.transactionGrouped) {
        this.chartData.labels.push(i);
      }
    },
  },
  created() {
    this.transactionGrouped();
  },

  beforeMount() {
    this.addLabels();
  },
};
</script>
