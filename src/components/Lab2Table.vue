<template>
  <a-table
      :columns="columns"
      :data-source="items"
      :pagination="false"
  />
</template>

<script>

const columns = [
  {
    title: 'year',
    key: 'year',
    dataIndex: 'year',
  },
  {
    title: 'profit',
    key: 'profit',
    dataIndex: 'profit',
  },
  {
    title: 'deposit',
    key: 'deposit',
    dataIndex: 'deposit',
  },
  {
    title: 'loan',
    key: 'loan',
    dataIndex: 'loan',
  },
  {
    title: 'balance',
    key: 'balance',
    dataIndex: 'balance',
  },
  {
    title: 'projectExpense',
    key: 'projectExpense',
    dataIndex: 'projectExpense',
  },
  {
    title: 'loanReturned',
    key: 'loanReturned',
    dataIndex: 'loanReturned',
  },
  {
    title: 'loanPayment',
    key: 'loanPayment',
    dataIndex: 'loanPayment',
  },
]

export default {
  name: "Lab2Table",
  props: {
    items: Array,
  },
  data() {
    return {
      columns: columns,
    }
  }
}
</script>

<style scoped>

</style>