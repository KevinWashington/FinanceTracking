<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">Transações</h1>

      <AppButton @click="isAdding = !isAdding"> Nova transação </AppButton>
    </div>

    <TransactionAdd
      v-if="isAdding"
      @cancel="isAdding = false"
      @after-add="afterAdd"
    />

    <TransactionFilter @filter="onFilter" />
    <div class="mt-5">
      <div class="space-y-8">
        <div v-for="(group, index) in transactionGrouped" :key="group.index">
          <div class="mb-1">
            <div class="font-bold text-sm">
              {{ formatDate(index) }}
            </div>
          </div>
          <Transaction
            v-for="transaction in group"
            :key="transaction.id"
            :transaction="transaction"
            @update="onUpdate"
            @delete="onDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy, orderBy } from "lodash";
import Transaction from "~/components/Transactions/Transaction";
import AppButton from "~/components/Ui/AppButton";
import AppFormInput from "~/components/Ui/AppFormInput";
import AppFormLabel from "~/components/Ui/AppFormLabel";
import AppFormSelect from "~/components/Ui/AppFormSelect";
import TransactionAdd from "~/components/Transactions/TransactionAdd";
import TransactionFilter from "../components/Transactions/TransactionFilter";

export default {
  name: "IndexPage",
  data() {
    return {
      isAdding: false,
    };
  },
  components: {
    Transaction,
    TransactionAdd,
    AppButton,
    AppFormInput,
    AppFormLabel,
    AppFormSelect,
    TransactionFilter,
  },

  async asyncData({ store }) {
    return {
      transactions: await store.dispatch("transactions/getTransaction"),
    };
  },

  computed: {
    transactionGrouped() {
      return groupBy(orderBy(this.transactions, "date", "desc"), "date");
    },
  },
  methods: {
    formatDate(date) {
      return this.$dayjs(date).format("D MMM YYYY");
    },
    afterAdd(transaction) {
      this.transactions.push(transaction);
    },
    onUpdate(transaction) {
      const idx = this.transactions.findIndex((o) => o.id === transaction.id);
      this.transactions.splice(idx, 1, transaction);
    },
    onDelete(id) {
      const idx = this.transactions.findIndex((o) => o.id === id);
      this.transactions.splice(idx, 1);
    },
    onFilter(filter) {
      this.$store
        .dispatch("transactions/getTransaction", filter)
        .then((response) => {
          this.transactions = response;
        });
    },
  },
};
</script>