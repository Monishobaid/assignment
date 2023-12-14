<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import Search from './Search.vue';
import routes from "../routes";
import { getAuth, signOut } from "firebase/auth";
import DisableButton from "./DisableButton.vue";

const cartStore = useCartStore()

const count = computed(() => cartStore.count)
const auth = getAuth();
const logOut = async () => {
  try {
    await signOut(auth);
    console.log("sign out successful");
    routes.push("/login");
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
</script>

<template>
    <div v-if="$route.path !== '/login'" class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div class="flex-none lg:hidden">
        <label for="drawer-input" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        </label>
    </div> 
    <div class="flex-none px-2">
        <span class="text-lg font-bold">
        Shopping Cart</span>
        </div> 
        <div class="flex-1 px-2 mx-2">
        <div class="items-stretch hidden lg:flex">
            <router-link class="btn btn-ghost btn-sm rounded-btn" to="/">
                Home
            </router-link> 
            <router-link class="btn btn-ghost btn-sm rounded-btn" to="/cart">
                Cart
                <div class="badge ml-2 badge-outline" v-text="count"></div>
            </router-link> 
        </div>
        </div> 
        <div class="flex-1 lg:flex-none">
            <Search />
        </div>
        <div class="mx-2">
            <DisableButton @click="logOut"/>
        </div>
    </div>
</template>
