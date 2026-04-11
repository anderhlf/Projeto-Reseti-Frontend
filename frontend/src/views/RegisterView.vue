<template>
    <div class="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">
        <div
            class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl p-10 flex flex-col items-center border border-white/20">

            <div class="flex flex-col items-center gap-2 mb-12">
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
                    <input v-model="password" type="password" placeholder="••••••••"
                        class="w-full p-4 rounded-full bg-white/60 border border-gray-200 outline-none shadow-inner focus:ring-2 focus:ring-blue-300 transition"
                        required />
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-full shadow-2xl transform transition active:scale-95 mt-6 text-lg">
                    Criar Conta
                </button>
            </form>

            <div class="mt-12 text-center">
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

const handleRegister = () => {
    console.log('Cadastro enviado:', { name: name.value, email: email.value });
};
</script>