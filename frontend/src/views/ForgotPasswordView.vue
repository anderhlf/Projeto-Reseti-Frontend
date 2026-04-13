<template>
    <div class="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

        <div
            class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl p-10 flex flex-col items-center border border-white/20 transform transition-all duration-300 ease-in-out">

            <div class="flex flex-col items-center gap-2 mb-10 text-center">
                <h1 class="text-5xl font-extrabold tracking-tighter text-blue-700 drop-shadow-md mb-2">RESETI</h1>
                <p class="text-gray-700 font-semibold px-4 text-lg">Recuperar sua senha</p>
            </div>

            <form @submit.prevent="handleReset" class="w-full space-y-6">

                <div class="space-y-1">
                    <label class="block text-sm font-semibold text-gray-700 ml-3">E-mail Cadastrado</label>
                    <div class="relative w-full flex items-center">
                        <input v-model="email" type="email" placeholder="exemplo@email.com"
                            class="w-full p-4 pr-14 rounded-full bg-white/60 border border-gray-200 outline-none shadow-inner focus:ring-2 focus:ring-blue-300 transition text-lg"
                            required />

                        <div
                            class="absolute right-0 top-0 h-full w-14 flex items-center justify-center text-gray-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-[11px] text-gray-500 ml-4 mt-3 leading-tight">
                        Enviaremos um link para o seu e-mail com as instruções para definir uma nova senha.
                    </p>
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-full shadow-2xl transform transition active:scale-95 mt-4 text-lg">
                    Enviar Instruções
                </button>
            </form>

            <div class="mt-12 text-center">
                <router-link to="/"
                    class="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2 group">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Voltar para o Login
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/services/api'; 
import { useRouter } from 'vue-router';
import { notify } from '@/utils/notificacoes';

const email = ref('');
const loading = ref(false);
const router = useRouter();

const handleReset = async () => {
    if (!email.value) return;
    
    loading.value = true;
    try {
        
        const response = await api.post('/auth/reset-senha', { 
            email: email.value 
        });

        notify('AVISO!', 'E-mail de recuperação enviado!', 'success');
        
        router.push('/'); 
        
    } catch (error) {
        console.error('Erro na solicitação:', error);
        notify('AVISO!', error.response?.data?.error || 'Erro ao processar solicitação', 'error');
    } finally {
        loading.value = false;
    }
};
</script>