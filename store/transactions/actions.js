export default {
  getTransaction(context, filter) {
    return this.$axios.$get("transactions", {
      params: {
        _expand: "category",
        ...filter,
      },
    });
  },
  addTransaction(context, data) {
    return this.$axios.$post("transactions", data);
  },
  updateTransaction(context, { id, data }) {
    return this.$axios.$patch(`transactions/${id}`, data);
  },
  deleteTransaction(context, id) {
    return this.$axios.$delete(`transactions/${id}`);
  },
};