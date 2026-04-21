<template>
  <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
    style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

    <Sidebar />

    <main class="flex-1 p-6 overflow-hidden flex flex-col text-gray-800 relative">

      <header class="flex justify-end items-center mb-4">
        <div class="flex items-center gap-4 bg-white/90 p-1.5 rounded-full border border-white/50 pr-8 shadow-xl">
          <div
            class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md uppercase transition-colors">
            {{ userInitial }}
          </div>
          <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ user.nome }}</span>
        </div>
      </header>

      <div
        class="bg-white/80 backdrop-blur-xl rounded-[40px] border border-white/50 p-12 shadow-2xl flex-1 flex flex-col justify-between transition-all duration-500">

        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-5xl font-black text-gray-950 uppercase tracking-tighter italic leading-none">
              {{ tituloPagina }}
            </h2>
            <p v-if="user.permissao === 'Adm' && viewAtual === 'painel'"
              class="text-[12px] font-black text-blue-600 uppercase tracking-[0.3em] mt-2">
              ADM
            </p>
          </div>
        </div>

        <div v-if="viewAtual === 'painel'" class="flex-1 flex flex-col items-center justify-center text-center">
          <div class="mb-14">
            <h3 class="text-2xl font-black uppercase text-gray-900 tracking-tighter">Abertura de Ordem de Serviço</h3>
            <div class="h-1.5 w-16 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div class="flex gap-10">
            <div v-for="(btn, i) in botoesPainel" :key="i" class="flex flex-col items-center">
              <button @click="btn.acao"
                class="w-72 h-44 bg-blue-600 hover:bg-blue-900 text-white rounded-[35px] shadow-2xl flex items-center justify-center font-black uppercase text-sm px-10 text-center leading-tight transition-all duration-300 active:scale-95 border-b-8 border-black/10">
                {{ btn.label }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="viewAtual === 'formulario'" class="flex-1 flex flex-col justify-center">
          <form @submit.prevent="enviarOS" class="grid grid-cols-2 gap-x-8 gap-y-4 max-w-5xl mx-auto w-full px-4">

            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-950 uppercase ml-2 tracking-widest">Usuário dele(a)</label>
              <input :value="user.nome" disabled
                class="w-full bg-gray-100 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-bold opacity-60 cursor-not-allowed" />
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-950 uppercase ml-2 tracking-widest">Email dele(a)</label>
              <input :value="user.email" disabled
                class="w-full bg-gray-100 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-bold opacity-60 cursor-not-allowed" />
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-950 uppercase ml-2 tracking-widest">setor_curso/Curso</label>
              <input :value="user.setor_curso" disabled
                class="w-full bg-gray-100 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-bold opacity-60 cursor-not-allowed" />
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-950 uppercase ml-2 tracking-widest">Tipo de Suporte</label>
              <div class="relative">
                <select v-model="formOS.tipo" required
                  class="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 appearance-none pr-12 transition">
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Rede">Rede / Conectividade</option>
                </select>
                <div class="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="col-span-2 space-y-1.5">
              <label class="text-[10px] font-black text-gray-950 uppercase ml-2 tracking-widest">Assunto</label>
              <input v-model="formOS.assunto" type="text" required placeholder="Título resumido do problema"
                class="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600" />
            </div>

            <div class="col-span-2 space-y-1.5">
              <label class="text-[10px] font-black text-gray-950 uppercase ml-2 tracking-widest">Descrição</label>
              <textarea v-model="formOS.descricao" rows="2" required placeholder="Detalhe o que está acontecendo..."
                class="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 resize-none"></textarea>
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-950 uppercase ml-2 tracking-widest">Sugestão
                Prioridade</label>
              <div class="relative">
                <select v-model="formOS.prioridade"
                  class="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 appearance-none pr-12 transition">
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
                <div class="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-950 uppercase ml-2 tracking-widest">Anexo</label>
              <input type="file" @change="handleFile"
                class="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-[10px] font-black uppercase" />
            </div>

            <div class="col-span-2 mt-4">
              <button type="submit"
                class="w-full bg-blue-600 hover:bg-blue-900 text-white font-black uppercase py-5 rounded-2xl shadow-2xl transition-all duration-300 active:scale-95 border-b-4 border-black/10">
                Confirmar Abertura de Chamado
              </button>
            </div>
          </form>
        </div>

        <div v-if="['minhas_os', 'todas_os', 'historico'].includes(viewAtual)"
          class="flex-1 flex flex-col overflow-hidden">
        </div>

        <div class="mt-4 flex justify-end border-t border-gray-200/50 pt-8">
          <button @click="botaoVoltar"
            class="bg-gray-950 hover:bg-black text-white text-[11px] font-black uppercase px-16 py-4 rounded-2xl shadow-2xl transition active:scale-95 tracking-widest">
            Voltar
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import api from '@/services/api';

const router = useRouter();
const user = ref({ nome: '', email: '', setor_curso: '', permissao: '', id: null });
const viewAtual = ref('painel');
const formOS = ref({ tipo: 'Hardware', assunto: '', descricao: '', prioridade: 'Média', anexo: null });

const userInitial = computed(() => user.value.nome?.charAt(0).toUpperCase() || 'A');

const tituloPagina = computed(() => {
  if (viewAtual.value === 'painel') return 'PAINEL';
  if (viewAtual.value === 'formulario') return 'ABERTURA DE CHAMADO';
  return 'LISTAGEM DE OS';
});

const botoesPainel = computed(() => {
  const btns = [
    { label: 'Realizar Abertura de OS', acao: () => viewAtual.value = 'formulario' },
    { label: 'Ver Minhas OS', acao: () => viewAtual.value = 'minhas_os' }
  ];
  if (user.value.permissao === 'Adm') {
    btns.push({ label: 'Ver Solicitações', acao: () => viewAtual.value = 'todas_os' });
  }
  return btns;
});

const botaoVoltar = () => viewAtual.value === 'painel' ? router.push('/dashboard') : viewAtual.value = 'painel';

onMounted(() => {
  const userData = sessionStorage.getItem('user');
  if (userData) user.value = JSON.parse(userData);
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>