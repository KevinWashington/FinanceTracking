export { default as TransactionsTransaction } from '../..\\components\\Transactions\\Transaction.vue'
export { default as TransactionsTransactionAdd } from '../..\\components\\Transactions\\TransactionAdd.vue'
export { default as TransactionsTransactionEdit } from '../..\\components\\Transactions\\TransactionEdit.vue'
export { default as TransactionsTransactionFilter } from '../..\\components\\Transactions\\TransactionFilter.vue'
export { default as UiAppButton } from '../..\\components\\Ui\\AppButton.vue'
export { default as UiAppFormInput } from '../..\\components\\Ui\\AppFormInput.vue'
export { default as UiAppFormLabel } from '../..\\components\\Ui\\AppFormLabel.vue'
export { default as UiAppFormSelect } from '../..\\components\\Ui\\AppFormSelect.vue'
export { default as UiHeader } from '../..\\components\\Ui\\Header.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
