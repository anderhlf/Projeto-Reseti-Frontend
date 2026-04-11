<template>
  <div 
    class="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
    style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');"
  >
    
    <div class="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl p-12 flex flex-col items-center border border-white/20 transform transition-all duration-300 ease-in-out">
      
      <div class="flex flex-col items-center gap-2 mb-10 text-center">
        <h1 class="text-6xl font-extrabold tracking-tighter text-blue-700 drop-shadow-md mb-2">RESETI</h1>
        <p class="text-gray-900 font-semibold text-2xl px-4">Dashboard</p>
      </div>

      <div class="w-full bg-white/50 rounded-3xl p-8 shadow-inner border border-white/20 mb-10">
        <p class="text-gray-800 text-lg leading-relaxed text-center">
          Bem-vindo, <strong class="text-blue-700">{nome}</strong>!<br />
          Este é o centro de controle do seu sistema de gestão de TI.
        </p>
      </div>

      <button 
        @click="handleLogout"
        class="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-full shadow-2xl transform transition active:scale-95 text-lg flex items-center justify-center gap-2 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sair do Sistema
      </button>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Função para fazer logout
const handleLogout = () => {
  // Limpa o token do login
  localStorage.removeItem('token');
  // Redireciona de volta para a tela de login
  router.push('/');
};
</script>