<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useCartStore } from "../stores/cart";
import { useProductStore } from '../stores/products'
import type { Product } from '../stores/products'
import { toCurrency } from '../keeper/utils'
import Nav from "../components/Nav.vue";

import CartCardSkeleton from '../components/CartCardSkeleton.vue'

const cartStore = useCartStore()
const productStore = useProductStore()
const route = useRoute()

const product = ref<Product | null>(null);

const loadProduct = () => {
  const productId = route.params.productId as string;
  const productItem = productStore.items[productId];
  if (productItem) {
    product.value = productItem;
  }
};

onMounted(() => {
  loadProduct();
});

</script>

<template>
  <div class="bg-base-100 text-base-content min-h-screen drawer-content">
    <Nav />
    <div class="p-4 max-w-4xl mx-auto">
      <div v-if="!productStore.loaded">
        <CartCardSkeleton />
      </div>
      <div v-else-if="product">
        <div class="card lg:card-side bordered">
          <figure class="px-10 pt-10">
            <img :src="product.image" alt="Card Image" class="object-contain w-full h-64" />
          </figure>
          <div class="card-body">
            <h2 class="card-title" v-text="product.title"></h2>
            <p v-text="product.description"></p>
            <p class="mt-4 text-lg">{{ toCurrency(product.price) }}</p>
            <div class="card-actions">
              <button class="btn btn-primary" @click="cartStore.add(product.id)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="text-xl text-error">No product found with id {{ route.params.productId }}</h1>
      </div>
    </div>
  </div>
</template>
