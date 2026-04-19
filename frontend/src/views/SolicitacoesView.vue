<!--CAMPO PARA VISUALIZAR TODAS AS RESERVAS-->

<template>
    <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">
        
        <Sidebar />

        <main class="flex-1 p-8 overflow-x-hidden flex flex-col text-gray-800">
            <div class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl flex-1 flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">Solicitações</h2>
                        <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest">Painel Administrativo de Reservas</p>
                    </div>
                    
                    <div class="flex gap-4">
                        <div class="relative">
                            <input v-model="searchQuery" type="text" placeholder="Buscar solicitante ou item..." 
                                class="bg-white/60 border border-white/40 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500 w-64 transition" />
                        </div>
                        <button @click="$router.push('/reserva')" class="bg-gray-800 text-white text-[10px] font-black uppercase px-6 py-2 rounded-xl">Voltar</button>
                    </div>
                </div>

                <div class="overflow-x-auto flex-1">
                    <table class="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr class="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                <th class="pl-6 pb-2">Equipamento</th>
                                <th class="pb-2">Solicitante</th>
                                <th class="pb-2">Período</th>
                                <th class="pb-2 text-center">Status</th>
                                <th class="pr-6 pb-2 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="res in solicitacoesFiltradas" :key="res.id_reserva" class="bg-white/40 hover:bg-white/60 transition-colors shadow-sm rounded-2xl">
                                <td class="py-4 pl-6 font-bold text-gray-800 uppercase text-xs">{{ res.equipamento }}</td>
                                <td class="py-4 font-black text-blue-700 text-[11px] uppercase">{{ res.solicitante }}</td>
                                <td class="py-4 text-[10px] font-bold text-gray-600">
                                    <div class="flex flex-col">
                                        <span>Início: {{ res.inicio }}</span>
                                        <span>Fim: {{ res.fim }}</span>
                                    </div>
                                </td>
                                <td class="py-4 text-center">
                                    <span :class="statusClass(res.status)" class="px-3 py-1 rounded-full text-[9px] font-black border uppercase">
                                        {{ res.status }}
                                    </span>
                                </td>
                                <td class="py-4 text-center pr-6">
                                    <div class="flex justify-center gap-2">
                                        <button @click="prepararEdicao(res)" class="text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Edit</button>
                                        <button @click="cancelarReserva(res.id_reserva)" class="text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Cancelar</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="loading" class="text-center py-10 font-black text-blue-600 animate-pulse">CARREGANDO SOLICITAÇÕES...</div>
                    <div v-if="!loading && solicitacoesFiltradas.length === 0" class="text-center py-10 text-gray-400 font-bold">Nenhuma reserva encontrada.</div>
                </div>
            </div>
        </main>

        <Transition name="fade">
            <div v-if="mostrarModalEditar" class="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl">
                    <h3 class="text-2xl font-black text-gray-900 uppercase italic mb-6">Editar Reserva</h3>
                    <form @submit.prevent="salvarEdicao" class="space-y-4">
                        <div>
                            <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Status da Reserva</label>
                            <select v-model="reservaForm.status" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold">
                                <option value="Em Reserva">EM RESERVA</option>
                                <option value="Entregue">ENTREGUE / FINALIZADA</option>
                                <option value="Atrasado">ATRASADO</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-[9px] font-black text-gray-500 uppercase ml-2">Observação Adm</label>
                            <textarea v-model="reservaForm.observacao" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold resize-none" rows="3"></textarea>
                        </div>
                        <div class="flex gap-3 pt-4">
                            <button type="button" @click="mostrarModalEditar = false" class="flex-1 bg-gray-200 text-gray-700 font-black uppercase py-4 rounded-2xl">Fechar</button>
                            <button type="submit" class="flex-1 bg-blue-600 text-white font-black uppercase py-4 rounded-2xl shadow-lg">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import api from '@/services/api';
import socket from '@/services/socket';
import { notify } from '@/utils/notificacoes';
import { useRouter } from 'vue-router';

const router = useRouter();
const listaSolicitacoes = ref([]);
const searchQuery = ref('');
const loading = ref(true);

// Estados para Edição de Reserva
const mostrarModalEditar = ref(false);
const reservaForm = ref({ id_reserva: null, data_inicio: '', data_fim: '', observacao: '', status: '' });

const carregarSolicitacoes = async () => {
    try {
        loading.value = true;
        const response = await api.get('/reservas/todas');
        listaSolicitacoes.value = response.data;
    } catch (e) {
        notify('Erro', 'Não foi possível carregar as solicitações.', 'error');
    } finally {
        loading.value = false;
    }
};

// FILTRO DE BUSCA
const solicitacoesFiltradas = computed(() => {
    return listaSolicitacoes.value.filter(res => 
        res.solicitante.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        res.equipamento.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const statusClass = (status) => {
    const s = status?.toUpperCase() || '';
    
    if (s === 'DISPONÍVEL') 
        return 'bg-green-100 text-green-700 border-green-200';
    
    if (s === 'RESERVADO' || s === 'EM RESERVA') 
        return 'bg-blue-100 text-blue-700 border-blue-200';
    
    if (s === 'ENTREGUE' || s === 'FINALIZADA') 
        return 'bg-gray-100 text-gray-700 border-gray-200';
    
    if (s === 'MANUTENÇÃO') 
        return 'bg-red-100 text-red-700 border-red-200';
        
    return 'bg-gray-50 text-gray-500 border-gray-100';
};

//  EDITAR E CANCELAR
const prepararEdicao = (reserva) => {
    reservaForm.value = { ...reserva };
    // Converter datas do formato BR para o formato que o input datetime-local aceita (YYYY-MM-DDTHH:mm)
    // Se sua API já mandar ISO, ignore a conversão manual
    mostrarModalEditar.value = true;
};

const salvarEdicao = async () => {
    try {
        await api.put(`/reservas/${reservaForm.value.id_reserva}`, reservaForm.value);
        notify('Sucesso', 'Reserva atualizada!', 'success');
        mostrarModalEditar.value = false;
        await carregarSolicitacoes();
    } catch (e) {
        notify('Erro', 'Falha ao atualizar reserva.', 'error');
    }
};

const cancelarReserva = async (id) => {
    const confirm = await notify('Confirmar', 'Deseja realmente cancelar esta reserva e liberar o equipamento?', 'warning');
    if (confirm.isConfirmed) {
        try {
            await api.delete(`/reservas/${id}`);
            notify('Cancelada', 'Reserva removida com sucesso.', 'success');
            await carregarSolicitacoes();
        } catch (e) {
            notify('Erro', 'Não foi possível cancelar.', 'error');
        }
    }
};

onMounted(() => {
    carregarSolicitacoes();
    socket.on("atualizar_lista", carregarSolicitacoes);
});

onUnmounted(() => { socket.off("atualizar_lista"); });
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

