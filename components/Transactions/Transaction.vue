<template lang="">
  <div class="px-5 my-5 py-6 bg-white rounded-lg shadow">
    <div class="flex items-center">
      <div class="flex items-center space-x-5">
        <div>
          <div>
            <div
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {{ transaction.category.name }}
            </div>
          </div>

          <div class="mt-1.5">{{ transaction.description }}</div>
        </div>
      </div>

      <div class="flex items-center space-x-4 ml-auto">
        <div class="flex items-center">
          <svg
            v-if="transaction.amount > 0"
            class="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <svg
            v-else
            class="w-4 h-4 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            ></path>
          </svg>

          <div class="font-bold">
            {{
              new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
                signDisplay: "never",
              }).format(transaction.amount)
            }}
          </div>
        </div>

        <button @click="isUpdating = !isUpdating">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <TransactionEdit
      v-if="isUpdating"
      :transaction="transaction"
      @cancel="isUpdating = false"
      @update="onUpdate"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import AppButton from "~/components/Ui/AppButton";
import AppFormInput from "~/components/Ui/AppFormInput";
import AppFormLabel from "~/components/Ui/AppFormLabel";
import AppFormSelect from "~/components/Ui/AppFormSelect";
import TransactionEdit from "~/components/Transactions/TransactionEdit";
export default {
  name: "Transaction",
  props: {
    transaction: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    AppButton,
    AppFormInput,
    AppFormLabel,
    AppFormSelect,
    TransactionEdit,
  },
  data() {
    return {
      isUpdating: false,
    };
  },
  methods: {
    onUpdate(transaction) {
      this.$emit("update", transaction);
    },
    onDelete(id) {
      this.$emit("delete", id);
    },
  },
};
</script>
<style lang=""></style>