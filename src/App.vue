<script setup lang="ts">
import { onMounted } from 'vue';
import Nav from "./components/Nav.vue";
import { usePersistCart } from "./keeper/hooks";
import { useCartStore } from "./stores/cart";
import { useProductStore } from './stores/products';

const productStore = useProductStore();
const cartStore = useCartStore();

productStore.fetchAll();
usePersistCart();
</script>
<template>
  <div class="drawer">
    <input id="drawer-input" type="checkbox" class="drawer-toggle" />
    <div class="bg-base-100 text-base-content min-h-screen drawer-content">
      <router-view></router-view>
    </div>
    <div class="drawer-side">
      <label for="drawer-input" class="drawer-overlay"></label> 
      <ul class="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
        <li>
          <router-link to="/">Home</router-link>
        </li> 
        <li>
          <router-link to="/cart">
            Cart
            <div class="badge ml-2 badge-outline" v-text="cartStore.count"></div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
