<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCartStore } from "../stores/cart";
import CartCard from "../components/CartCard.vue";
import { toCurrency } from "../keeper/utils";
import Nav from "../components/Nav.vue";

const cartStore = useCartStore();

type CartItem = {
  id: number;
  image: string;
  title: string;
  quantity: number;
  cost: number;
};

const formattedCart = ref<CartItem[]>([]);

onMounted(() => {
  updateFormattedCart();
});

function updateFormattedCart() {
  // Update formattedCart based on the current state of cartStore
  formattedCart.value = cartStore.formattedCart;
}
</script>

<template>
  <div class="bg-base-100 text-base-content min-h-screen drawer-content">
    <Nav />
    <div class="p-4 max-w-4xl mx-auto">
      <div v-if="!formattedCart.length">
        <h1 class="text-xl">Cart is empty.</h1>
      </div>
      <div v-else class="space-y-4">
        <CartCard
          v-for="(cartProduct, index) in formattedCart"
          :key="index"
          :cartProduct="cartProduct"
        />
        <div class="text-right text-2xl md:text-4xl">
          Total: {{ toCurrency(cartStore.total) }}
        </div>
      </div>
    </div>
  </div>
</template>
