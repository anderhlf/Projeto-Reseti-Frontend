<template>
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

        <div
            class="bg-white/10 backdrop-blur-2xl p-8 rounded-[35px] border border-white/20 shadow-2xl w-full max-w-md mx-4 text-center">
            <h2 class="text-3xl font-black text-white uppercase tracking-tighter mb-2">RESETI</h2>
            <p class="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8">Redefinir sua senha</p>

            <form @submit.prevent="handleReset" class="space-y-4">
                <div class="text-left relative">
                    <label class="text-[9px] font-black text-white/50 uppercase ml-4 mb-1 block">Nova Senha</label>
                    <input v-model="form.nova_senha" :type="showNovaSenha ? 'text' : 'password'" required
                        class="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-white font-bold outline-none focus:border-blue-500 transition-all pr-12"
                        placeholder="••••••••" />
                    
                    <button type="button" @click="showNovaSenha = !showNovaSenha"
                        class="absolute right-4 bottom-3 text-white/40 hover:text-white transition-colors">
                        <svg v-if="!showNovaSenha" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                    </button>
                </div>

                <div class="text-left relative">
                    <label class="text-[9px] font-black text-white/50 uppercase ml-4 mb-1 block">Confirmar Senha</label>
                    <input v-model="form.confirmar_senha" :type="showConfirmarSenha ? 'text' : 'password'" required
                        class="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-white font-bold outline-none focus:border-blue-500 transition-all pr-12"
                        placeholder="••••••••" />
                    
                    <button type="button" @click="showConfirmarSenha = !showConfirmarSenha"
                        class="absolute right-4 bottom-3 text-white/40 hover:text-white transition-colors">
                        <svg v-if="!showConfirmarSenha" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                    </button>
                </div>

                <button :disabled="loading" type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50">
                    {{ loading ? 'Atualizando...' : 'Salvar Nova Senha' }}
                </button>
            </form>

            <p v-if="mensagem" class="mt-6 text-sm font-bold text-green-400">{{ mensagem }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const mensagem = ref('');

const showNovaSenha = ref(false);
const showConfirmarSenha = ref(false);

const form = reactive({
    nova_senha: '',
    confirmar_senha: ''
});

const handleReset = async () => {
    // Validação local antes de enviar ao servidor
    if (form.nova_senha !== form.confirmar_senha) {
        notify('AVISO!', 'As senhas não coincidem!', 'info');
        return;
    }

    loading.value = true;
    const token = route.params.token; // Pegamos o token direto da URL do navegador

    try {
        const response = await api.post(`/auth/reset-senha/${token}`, {
            nova_senha: form.nova_senha
        });

        mensagem.value = response.data.message;

        // Aguarda 3 segundos e redireciona para o login
        setTimeout(() => {
            router.push('/');
        }, 3000);

    } catch (error) {
        notify('Erro', error.response?.data?.error || 'Erro ao redefinir senha', 'error');
    } finally {
        loading.value = false;
    }
};
</script>