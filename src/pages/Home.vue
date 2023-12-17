<script setup lang="ts">
import { ref } from "vue";
import ProductCard from "../components/ProductCard.vue";
import ProductCardSkeleton from "../components/ProductCardSkeleton.vue";
import { useProductStore, type Product } from "../stores/products";
import Nav from "../components/Nav.vue";

const productStore = useProductStore();
type Order = "default" | "priceAsc" | "priceDesc";
let order = ref<Order>("default");
let products = ref<Product[]>([]);
let filteredProducts = ref<Product[]>([]);

const sortByPrice = (a: Product, b: Product, order: Order) => {
  const priceA = a.price || 0;
  const priceB = b.price || 0;

  return order === "priceAsc" ? priceA - priceB : priceB - priceA;
};

const updateFilteredProducts = () => {
  if (order.value === "priceAsc" || order.value === "priceDesc") {
    filteredProducts.value = products.value.slice().sort((a, b) => sortByPrice(a, b, order.value));
  } else {
    filteredProducts.value = products.value.slice();
  }
};

const setOrder = (val: Order) => {
  order.value = val;
  updateFilteredProducts();
};

const loadProducts = () => {
  products.value = productStore.list;
  updateFilteredProducts();
};

loadProducts();
</script>

<template>
  <div class="bg-base-100 text-base-content min-h-screen drawer-content">
    <Nav />
    <div class="p-4 max-w-7xl mx-auto">
      <div class="text-center lg:text-left">
        <div class="block mb-3 font-bold">Sort by:</div>
        <div class="divide-x-2 inline-flex border-2 h-12 rounded-lg mb-3">
          <button
            class="px-4 text-gray-500 hover:text-gray-800"
            @click="setOrder('priceAsc')"
          >
            Price &uarr;
          </button>
          <button
            href=""
            class="px-4 text-gray-500 hover:text-gray-800"
            @click="setOrder('default')"
          >
            What's new
          </button>
          <button
            class="px-4 text-gray-500 hover:text-gray-800"
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
  </div>
</template>
