<template>
  <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
    style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

    <Sidebar />

    <main class="flex-1 p-8 overflow-x-hidden flex flex-col text-gray-800">

      <header class="flex justify-end items-center mb-6">
        <div class="flex items-center gap-4 bg-white/90 p-1.5 rounded-full border border-white/50 pr-8 shadow-xl">
          <div
            class="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md uppercase">
            {{ userInitial }}
          </div>
          <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ userName }}</span>
        </div>
      </header>

      <div class="grid grid-cols-3 gap-6 mb-6">
        <div
          class="bg-white/80 backdrop-blur-xl rounded-[25px] border border-white/50 p-6 shadow-xl border-l-[6px] border-l-blue-600">
          <p class="text-blue-700 text-[10px] font-black uppercase tracking-widest mb-2">OS Pendentes</p>
          <h3 class="text-5xl font-black text-gray-900 leading-none">{{ stats.os_pendentes }}</h3>
        </div>
        <div class="bg-white/80 backdrop-blur-xl rounded-[25px] border border-white/50 p-6 shadow-xl">
          <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Equipamentos em Uso</p>
          <h3 class="text-5xl font-black text-gray-900 leading-none">{{ stats.equipamentos_uso }}</h3>
        </div>
        <div class="bg-white/80 backdrop-blur-xl rounded-[25px] border border-white/50 p-6 shadow-xl">
          <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Reservas para Hoje</p>
          <h3 class="text-5xl font-black text-gray-900 leading-none">{{ stats.reservas_hoje }}</h3>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 items-start">

        <div class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl min-h-[380px]">
          <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8">Próximas Manutenções</h2>

          <div class="space-y-10">
            <div v-for="manutencao in manutencoes" :key="manutencao.id">
              <div class="flex justify-between mb-2">
                <span class="text-[11px] font-black text-gray-800 uppercase italic tracking-tighter">{{ manutencao.nome
                  }}</span>
                <span class="text-[11px] font-black text-blue-600">{{ manutencao.progresso }}%</span>
              </div>
              <div class="w-full bg-gray-200/50 rounded-full h-4 overflow-hidden">
                <div class="bg-blue-600 h-full rounded-full transition-all duration-1000"
                  :style="{ width: manutencao.progresso + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl min-h-[380px] flex flex-col items-center justify-center">
          <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-6">Atividade do Sistema</h2>

          <div class="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg class="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="65" stroke="currentColor" stroke-width="14" fill="transparent"
                class="text-gray-200/50" />
              <circle cx="80" cy="80" r="65" stroke="currentColor" stroke-width="14" fill="transparent"
                stroke-dasharray="408" :stroke-dashoffset="408 - (408 * stats.atividade / 100)" stroke-linecap="round"
                class="text-blue-500 transition-all duration-1000" />
            </svg>
            <span class="absolute text-5xl font-black text-gray-900">{{ stats.atividade }}%</span>
          </div>

          <p class="text-blue-700 text-[10px] font-black uppercase tracking-widest">Operação 100% Estável</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import api from '@/services/api';
import socket from '@/services/socket';
import { ref, onMounted, onUnmounted } from 'vue';

const userName = ref('Carregando...');
const userInitial = ref('?');

const stats = ref({ 
  os_pendentes: 0, 
  equipamentos_uso: 0, 
  reservas_hoje: 0, 
  atividade: 0 
});

const manutencoes = ref([]);

// Aqui vou pegar os dados vindo da API
const buscarInformacoes = async () => {
  try {
    const response = await api.get('/dashboard/dados/stats'); 
    
    stats.value = {
      os_pendentes: response.data.os_pendentes,
      equipamentos_uso: response.data.equipamentos_uso,
      reservas_hoje: response.data.reservas_hoje,
      atividade: response.data.atividade
    };

    manutencoes.value = response.data.manutencoes;
    
    console.log("Dashboard RESETI sincronizado com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar resumo:", error);
  }
};

onMounted(async () => {
  const userData = sessionStorage.getItem('user');
  const user = (userData && userData !== "[object Object]") ? JSON.parse(userData) : {};
  
  if (userData) {
    const user = JSON.parse(userData);
    userName.value = user.nome;
    userInitial.value = user.nome.charAt(0).toUpperCase();
  }

  await buscarInformacoes();

  socket.on("atualizar_lista", () => {
    console.log("Socket: Novas alterações, atualizando");
    buscarInformacoes();
  });
});

onUnmounted(() => {
  socket.off("atualizar_lista");
});
</script>