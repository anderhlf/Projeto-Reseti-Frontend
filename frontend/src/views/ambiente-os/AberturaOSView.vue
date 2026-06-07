<template>
  <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
    style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

    <Sidebar />

    <main class="flex-1 p-8 overflow-x-hidden flex flex-col text-gray-800 relative">

      <header class="flex justify-end items-center mb-6">
        <div class="flex items-center gap-4 bg-white/90 p-1.5 rounded-full border border-white/50 pr-8 shadow-xl">
          <div
            class="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md uppercase">
            {{ userInitial }}
          </div>
          <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ user.nome }}</span>
        </div>
      </header>

      <div
        class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl flex-1 flex flex-col">

        <div class="flex justify-between items-center mb-10">
          <div>
            <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">
              Abertura de Ordem de Serviço
            </h2>
            <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest mt-1">
              Selecione uma opção para continuar
            </p>
          </div>

        </div>

        <div class="flex-1 flex items-center justify-center w-full">
          <div class="grid grid-cols-3 gap-6 w-full">

            <button @click="$router.push('/nova-os')"
              class="group w-full bg-blue-600 hover:bg-blue-700 border border-blue-500/50 hover:border-blue-400 rounded-[30px] p-8 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex flex-col items-center gap-5">
              <div
                class="w-16 h-16 bg-white/20 group-hover:bg-white/30 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white transition-colors duration-300" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span
                class="text-sm font-black uppercase text-white text-center leading-tight tracking-tight">
                Realizar abertura de OS
              </span>
            </button>

            <button @click="$router.push('/minhas-os')"
              class="group w-full bg-blue-600 hover:bg-blue-700 border border-blue-500/50 hover:border-blue-400 rounded-[30px] p-8 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex flex-col items-center gap-5">
              <div
                class="w-16 h-16 bg-white/20 group-hover:bg-white/30 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white transition-colors duration-300" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span
                class="text-sm font-black uppercase text-white text-center leading-tight tracking-tight">
                Ver minhas OS
              </span>
            </button>

            <button v-if="user?.permissao === 'Adm'" @click="$router.push('/solicitacoes-os')"
              class="group w-full bg-blue-600 hover:bg-blue-700 border border-blue-500/50 hover:border-blue-400 rounded-[30px] p-8 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex flex-col items-center gap-5">
              <div
                class="w-16 h-16 bg-white/20 group-hover:bg-white/30 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white transition-colors duration-300" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span
                class="text-sm font-black uppercase text-white text-center leading-tight tracking-tight">
                Ver Solicitações
              </span>
            </button>

          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

const user = ref({ nome: '', email: '', setor_curso: '', permissao: '', id: null });

const userInitial = computed(() => user.value.nome?.charAt(0).toUpperCase() || 'A');

onMounted(() => {
  const userData = sessionStorage.getItem('user');
  if (userData) user.value = JSON.parse(userData);
});
</script>
