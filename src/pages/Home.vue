<script setup lang="ts">
import { computed, ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import ProductCardSkeleton from '../components/ProductCardSkeleton.vue';
import { useProductStore, type Product } from '../stores/products';

const productStore = useProductStore();
type Order = 'default' | 'priceAsc' | 'priceDesc';
let order = ref<Order>('default');
const products = computed(() => productStore.list);
const productsPL = computed(() => {
  return products.value.sort((a: Product, b: Product) => {
    return a.price > b.price ? 1 : -1;
  });
});
const productsPH = computed(() => {
  return products.value.sort((a: Product, b: Product) => {
    return a.price < b.price ? 1 : -1;
  });
});
const filteredProducts = computed(() => {
  if (order.value === 'priceAsc') {
    return productsPL.value;
  } else if (order.value === 'priceDesc') {
    return productsPH.value;
  }

  return products.value;
});

function setOrder(val: Order) {
  order.value = val;
}
</script>

<template>
    <div class="p-4 max-w-7xl mx-auto">
      <div class="text-center lg:text-left">
        <div class="block mb-3 font-bold">Sort by:</div>
        <div class="divide-x-2 inline-flex border-2 h-16 rounded-lg mb-3">
          <button
            class="px-8 py-4 text-gray-500 hover:text-gray-800"
            @click="setOrder('priceAsc')"
          >
            Price &uarr;
          </button>
          <button
            href=""
            class="px-8 py-4 text-gray-500 hover:text-gray-800"
            @click="setOrder('default')"
          >
            What's new
          </button>
          <button
            class="px-8 py-4 text-gray-500 hover:text-gray-800"
            @click="setOrder('priceDesc')"
          >
            Price &darr;
          </button>
        </div>
      </div>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ProductCardSkeleton
          v-show="!productStore.loaded"
          v-for="n in 15"
          :key="n"
        />
  
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </template>
  