<template>
    <div class="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

        <div
            class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl p-10 flex flex-col items-center border border-white/20">

            <div class="flex flex-col items-center gap-2 mb-10">
                <h1 class="text-6xl font-extrabold tracking-tighter text-blue-700 drop-shadow-md">RESETI</h1>
            </div>

            <form @submit.prevent="handleRegister" class="w-full space-y-5">

                <div class="space-y-1">
                    <label class="block text-sm font-semibold text-gray-700 ml-3">Nome Completo</label>
                    <input v-model="name" type="text" placeholder="Seu nome completo"
                        class="w-full p-4 rounded-full bg-white/60 border border-gray-200 outline-none shadow-inner focus:ring-2 focus:ring-blue-300 transition"
                        required />
                </div>

                <div class="space-y-1">
                    <label class="block text-sm font-semibold text-gray-700 ml-3">E-mail</label>
                    <input v-model="email" type="email" placeholder="exemplo@email.com"
                        class="w-full p-4 rounded-full bg-white/60 border border-gray-200 outline-none shadow-inner focus:ring-2 focus:ring-blue-300 transition"
                        required />
                </div>

                <div class="space-y-1">
                    <label class="block text-sm font-semibold text-gray-700 ml-3">Senha</label>
                    <div class="relative w-full">
                        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                            class="w-full p-4 pr-14 rounded-full bg-white/60 border border-gray-200 outline-none shadow-inner focus:ring-2 focus:ring-blue-300 transition"
                            required />

                        <button type="button" @click="showPassword = !showPassword"
                            class="absolute right-0 top-0 h-full w-14 flex items-center justify-center text-gray-500 hover:text-blue-600 transition focus:outline-none">
                            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                        </button>
                    </div>
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-full shadow-2xl transform transition active:scale-95 mt-6 text-lg">
                    Criar Conta
                </button>
            </form>

            <div class="mt-10 text-center">
                <p class="text-gray-500 text-sm">
                    Já possui uma conta?
                    <router-link to="/" class="text-blue-600 font-bold hover:underline">Voltar para o
                        Login</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false); // Adicionado para o olhinho funcionar

const handleRegister = () => {
    console.log('Dados de cadastro:', { name: name.value, email: email.value });
};
</script>