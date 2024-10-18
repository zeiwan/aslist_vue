<script lang="ts" setup>
import Navbar from "~/layouts/Navbar/Index.vue";

defineOptions({
  name: "Layout",
});
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>

</style>
