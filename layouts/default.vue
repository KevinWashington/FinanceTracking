<template>
  <div>
    <Header />
    <div class="max-w-7xl mx-auto p-4">
      <div class="mt-4">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Ui/Header.vue';
    export default {
    name: "",
    data() {
        return {};
    },
    methods: {},
    components: { Header }
};
</script>
