<script setup>
defineProps({
  docs: {
    type: Array,
  },
});
</script>

<template>
  <div class="dropdown">
    <button>Välj dokument</button>
    <div class="dropdown-content">
      <p v-for="item in docs" :key="item._id">{{ item.title }}</p>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  display: inline-block;
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  width: 100%;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
  background-color: #41b883;
}

.dropdown-content p {
  display: block;
  color: #000000;
  padding: 5px;
  text-decoration: none;
}

.dropdown-content p:hover {
  color: #ffffff;
  background-color: #34495e;
}
</style>
