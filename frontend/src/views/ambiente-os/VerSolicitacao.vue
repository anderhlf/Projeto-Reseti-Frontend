<template>
    <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

        <Sidebar />

        <main class="flex-1 p-8 overflow-x-hidden flex flex-col text-gray-800 relative">
            <header class="flex justify-end items-center mb-6">
                <div
                    class="flex items-center gap-4 bg-white/90 p-1.5 rounded-full border border-white/50 pr-8 shadow-xl">
                    <div
                        class="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md uppercase">
                        {{ userInitial }}
                    </div>
                    <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ userName }}</span>
                </div>
            </header>

            <div
                class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl flex-1 flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">Solicitações
                        </h2>
                        <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest">Painel Administrativo
                            de Ordens de Serviço</p>
                    </div>
                    <div class="flex gap-4">
                        <div class="relative">
                            <input v-model="searchQuery" type="text" placeholder="Buscar solicitante ou assunto..."
                                class="bg-white/60 border border-white/40 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500 w-64 transition" />
                        </div>
                        <button @click="$router.push('/abertura-os')"
                            class="bg-gray-800 hover:bg-black text-white text-[10px] font-black uppercase px-6 py-2 rounded-xl transition active:scale-95">
                            Voltar
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto flex-1">
                    <table class="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr class="text-[10px] font-black text-gray-500 uppercase tracking-widest px-6">
                                <th class="pl-6 pb-2">Número da OS</th>
                                <th class="pb-2">Solicitante</th>
                                <th class="pb-2">Setor do Solicitante</th>
                                <th class="pb-2">Assunto</th>
                                <th class="pb-2">Prioridade</th>
                                <th class="pb-2">Data da Abertura</th>
                                <th class="pb-2 text-center">Visualizar Anexo</th>
                                <th class="pb-2 text-center">Status</th>
                                <th class="pb-2 text-center pr-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ordem in ordensPaginadas" :key="ordem.id_os"
                                class="bg-white/40 hover:bg-white/60 transition-colors shadow-sm rounded-2xl">
                                <td class="py-4 pl-6 font-bold text-gray-800 uppercase text-xs">{{ ordem.numero_os }}</td>
                                <td class="py-4 text-xs font-medium text-gray-600 uppercase">{{ ordem.solicitante }}</td>
                                <td class="py-4 text-xs font-medium text-gray-600 uppercase">{{ ordem.setor }}</td>
                                <td class="py-4 text-xs font-medium text-gray-600">{{ ordem.assunto }}</td>
                                <td class="py-4 text-xs font-medium text-gray-600 uppercase">{{ ordem.prioridade }}</td>
                                <td class="py-4 text-xs font-medium text-gray-600">{{ ordem.data_inicio }}</td>
                                <td class="py-4 text-center">
                                    <button v-if="ordem.anexo" @click="abrirAnexo(ordem.anexo)" type="button"
                                        title="Visualizar anexo"
                                        class="inline-flex items-center justify-center p-2 rounded-lg text-blue-600 border border-blue-200 hover:bg-blue-50 transition active:scale-95">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                    <span v-else class="text-[10px] font-bold text-gray-400 uppercase">—</span>
                                </td>
                                <td class="py-4 text-center">
                                    <span :class="statusClass(ordem.status)"
                                        class="px-4 py-1.5 rounded-full text-[9px] font-black border uppercase">
                                        {{ ordem.status }}
                                    </span>
                                </td>
                                <td class="py-4 text-center pr-6">
                                    <div class="relative inline-block min-w-[160px]">
                                        <select :value="ordem.status"
                                            @change="atualizarStatus(ordem, $event.target.value)"
                                            class="w-full bg-white/60 border border-blue-200 rounded-lg px-3 py-2 pr-7 text-[9px] font-black uppercase outline-none focus:border-blue-600 transition appearance-none cursor-pointer">
                                            <option v-if="!opcoesStatus.includes(ordem.status)" :value="ordem.status">
                                                {{ ordem.status }}
                                            </option>
                                            <option v-for="opcao in opcoesStatus" :key="opcao" :value="opcao">
                                                {{ opcao }}
                                            </option>
                                        </select>
                                        <div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                            <svg class="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
                                                    d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="!loading && ordensFiltradas.length === 0">
                                <td colspan="9" class="text-center py-10 text-gray-500 font-bold uppercase text-xs">
                                    Nenhuma ordem de serviço encontrada.</td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="loading" class="text-center py-10 font-black text-blue-600 animate-pulse uppercase text-xs">
                        Carregando solicitações...
                    </div>
                </div>

                <div class="mt-8 flex justify-between items-center border-t border-gray-200/50 pt-6">
                    <button @click="$router.go(-1)"
                        class="bg-gray-800 hover:bg-black text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition active:scale-95">
                        Voltar
                    </button>

                    <div class="flex items-center gap-4">
                        <button @click="prevPage" :disabled="currentPage === 1" type="button"
                            class="p-2 rounded-lg hover:bg-blue-50 disabled:opacity-20 transition-all text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <span class="text-[11px] font-black text-gray-500 uppercase tracking-widest">
                            Página {{ currentPage }} de {{ totalPages }}
                        </span>

                        <button @click="nextPage" :disabled="currentPage === totalPages" type="button"
                            class="p-2 rounded-lg hover:bg-blue-50 disabled:opacity-20 transition-all text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import api from '@/services/api';
import Sidebar from '@/components/Sidebar.vue';
import { notify } from '@/utils/notificacoes';

const todasOrdens = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref('');
const loading = ref(true);

const opcoesStatus = ['Ativo', 'Em andamento', 'Aguardando validação', 'Finalizado'];

const userRaw = sessionStorage.getItem('user');
const user = userRaw && userRaw !== "[object Object]" ? JSON.parse(userRaw) : {};

const userName = computed(() => user.nome || 'Usuário');
const userInitial = computed(() => user.nome ? user.nome.charAt(0) : 'U');

const ordensFiltradas = computed(() => {
    const termo = searchQuery.value.toLowerCase();
    return todasOrdens.value.filter(ordem =>
        (ordem.solicitante || '').toLowerCase().includes(termo) ||
        (ordem.assunto || '').toLowerCase().includes(termo)
    );
});

const totalPages = computed(() => {
    const total = Math.ceil(ordensFiltradas.value.length / itemsPerPage);
    return total > 0 ? total : 1;
});

const ordensPaginadas = computed(() => {
    const inicio = (currentPage.value - 1) * itemsPerPage;
    const fim = inicio + itemsPerPage;
    return ordensFiltradas.value.slice(inicio, fim);
});

watch(searchQuery, () => {
    currentPage.value = 1;
});

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const carregarTodasOrdens = async () => {
    try {
        loading.value = true;
        const response = await api.get('/os/todas');
        todasOrdens.value = response.data;
        currentPage.value = 1;
    } catch (error) {
        notify('Erro', 'Falha ao carregar ordens de serviço', 'error');
    } finally {
        loading.value = false;
    }
};

const abrirAnexo = (caminho) => {
    if (!caminho) return;
    const nomeArquivo = caminho.split('/').pop();
    window.open(`${api.defaults.baseURL}/os/anexo/${nomeArquivo}`, '_blank');
};

const statusClass = (status) => {
    const classes = {
        'Ativo': 'bg-green-100 text-green-700 border-green-200',
        'Em andamento': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'Aguardando validação': 'bg-blue-100 text-blue-700 border-blue-200',
        'Finalizado': 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return classes[status] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const atualizarStatus = async (ordem, novoStatus) => {
    const statusAnterior = ordem.status;
    if (novoStatus === statusAnterior) return;

    ordem.status = novoStatus;

    try {
        await api.put(`/os/${ordem.id_os}`, { status: novoStatus });
        notify('Sucesso', `Status da OS ${ordem.numero_os} atualizado!`, 'success');
    } catch (error) {
        ordem.status = statusAnterior;
        notify('Erro', error.response?.data?.error || 'Falha ao atualizar status', 'error');
    }
};

onMounted(carregarTodasOrdens);
</script>
