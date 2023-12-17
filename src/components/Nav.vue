
<script setup lang="ts">
import { ref, watch } from "vue";
import { useCartStore } from "../stores/cart";
import Search from './Search.vue';
import routes from "../routes";
import { getAuth, signOut } from "firebase/auth";
import DisableButton from "./DisableButton.vue";

const cartStore = useCartStore();
const count = ref<number>(cartStore.count);
const auth = getAuth();

// Watch for changes in cartStore.count and update the local count
watch(() => cartStore.count, (newCount) => {
  count.value = newCount;
});

const logOut = async () => {
    try {
        await signOut(auth);
        console.log("Sign out successful");
        routes.push("/login");
    } catch (error) {
        console.log(error);
        alert(error);
    }
};
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">dukaan</span>
            </div>
            <div class="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
                <router-link class="btn btn-ghost btn-sm rounded-btn" to="/">
                    Home
                </router-link>
                <router-link class="btn btn-ghost btn-sm rounded-btn" to="/cart">
                    Cart
                    <div class="badge ml-2 badge-outline" v-text="count"></div>
                </router-link>
                <div class="flex-1 lg:flex-none">
                    <Search />
                </div>
            </div>
            <div class="mx-2">
                <DisableButton @click="logOut" />
            </div>
        </div>
    </nav>
</template>

