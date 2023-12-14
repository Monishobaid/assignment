<template>
  <div>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to create your account</h2>
      </div>

      <div class="mt-4">
        <form class="space-y-6">
          <div class="w-full text-start">
            <label for="email" class="text-align-left text-sm font-medium leading-6 text-gray-900">Email address</label>
          </div>
          <div>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required="true" v-model="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required="true" v-model="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="button" @click="signup" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Have Account?
          {{ '  ' }}
          <router-link to="/Login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '../firebase/main';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import router from '../routes';

const email = ref<any>('');
const password = ref<any>('');
const errorMessage = ref<any>('');

const signup = async () => {
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
  //   const user = userCredential.user;
    router.push('/');
  }
  catch (error) {
      const errorCode = error;
      if(errorCode === 'auth/email-already-in-use'){
          errorMessage.value = 'The email address is already in use';
          console.log(errorMessage);
      }
  }
};
</script>
