<template>
    <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

        <Sidebar />

        <main class="flex-1 p-8 overflow-x-hidden flex flex-col text-gray-800 relative">

            <header class="flex justify-end items-center mb-6">
                <div class="flex items-center gap-4 bg-white/90 p-1.5 rounded-full border border-white/50 pr-8 shadow-xl">
                    <div class="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md uppercase">
                        {{ userInitial }}
                    </div>
                    <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ userName }}</span>
                </div>
            </header>

            <div class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl flex-1 flex flex-col">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">Área de Reserva</h2>
                        <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest">Tabelas dos Equipamentos</p>
                    </div>

                    <div class="flex gap-3">
                        <button @click="irParaSolicitacoes" class="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 text-[13px] font-black uppercase px-6 py-3 rounded-xl shadow-lg transition active:scale-95">
                            Ver Solicitações
                        </button>
                        <button @click="abrirModalCriar" class="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 text-[13px] font-black uppercase px-6 py-3 rounded-xl shadow-lg transition active:scale-95">
                            Criar Equipamento
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto flex-1">
                    <table class="w-full text-left border-separate border-spacing-y-3">
                        <tbody>
                            <tr v-for="item in listaEquipamentos" :key="item.id_equip" class="bg-white/40 hover:bg-white/60 transition-colors shadow-sm rounded-2xl">
                                <td class="py-4 pl-6 font-bold text-gray-800 uppercase text-xs">{{ item.nome }}</td>
                                <td class="py-4 text-center">
                                    <span :class="statusClass(item.status)" class="px-4 py-1.5 rounded-full text-[9px] font-black border uppercase">
                                        {{ item.status }}
                                    </span>
                                </td>
                                <td class="py-4 text-center">
                                    <button @click="prepararReserva(item)" :disabled="!podeReservar(item.status)"
                                        :class="podeReservar(item.status) ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                                        class="text-[9px] font-black uppercase px-5 py-2.5 rounded-xl shadow-md transition active:scale-95">
                                        Realizar Reserva
                                    </button>
                                </td>
                                <td class="py-4 text-center pr-6">
                                    <div class="flex justify-center gap-2">
                                        <button @click="abrirModalEditar(item)" 
                                            class="text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase transition">
                                        Editar Equipamento
                                        </button>
                                        <button 
                                            v-if="item.status === 'Reservado'"
                                            @click="handleCancelarReserva(item)" 
                                            class="text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase transition">
                                        Cancelar Reserva
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-8 flex justify-between items-center border-t border-gray-200/50 pt-6">
                    <button @click="$router.go(-1)" class="bg-gray-800 hover:bg-black text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition active:scale-95">Voltar</button>
                    <button class="bg-blue-800 hover:bg-blue-900 text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition active:scale-95">Minhas Reservas</button>
                </div>
            </div>

            <Transition name="fade">
                <div v-if="mostrarModalCriar" class="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 text-left">
                    <div class="bg-white/95 backdrop-blur-2xl rounded-[40px] border border-white/50 w-full max-w-lg shadow-2xl p-10 transform transition-all">
                        
                        <div class="mb-8">
                            <h3 class="text-2xl font-black text-gray-950 uppercase tracking-tighter italic">
    {{ isEditing ? 'Editar Equipamento' : 'Novo Equipamento' }}
</h3>
                            <div class="h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
                        </div>

                        <form @submit.prevent="salvarEquipamento" class="space-y-5">
                            <div class="space-y-1">
                                <label class="text-[10px] font-black text-gray-600 uppercase ml-2 tracking-widest">Nome Equipamento</label>
                                <input v-model="equipamentoForm.nome" type="text" placeholder="Ex: Notebook Dell" required
                                    class="w-full bg-white border border-gray-200 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition" />
                            </div>

                            <div class="space-y-1">
                                <label class="text-[10px] font-black text-gray-600 uppercase ml-2 tracking-widest">Número de Série</label>
                                <input v-model="equipamentoForm.numero_serie" type="text" placeholder="Ex: SN-998877" required
                                    class="w-full bg-white border border-gray-200 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition" />
                            </div>

                            <div class="space-y-1">
                                <label class="text-[10px] font-black text-gray-600 uppercase ml-2 tracking-widest">Observação</label>
                                <textarea v-model="equipamentoForm.observacao" placeholder="Detalhes adicionais..." rows="2"
                                    class="w-full bg-white border border-gray-200 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition resize-none"></textarea>
                            </div>

                            <div class="space-y-1">
                                <label class="text-[10px] font-black text-gray-600 uppercase ml-2 tracking-widest">Status: Select</label>
                                <select v-model="equipamentoForm.status" required
                                    class="w-full bg-white border border-gray-200 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition appearance-none">
                                    <option value="Disponível">DISPONÍVEL</option>
                                    <option value="Manutenção">MANUTENÇÃO</option>
                                    <option value="Reservado" :disabled="!isEditing">RESERVADO</option>
                                </select>
                            </div>

                            <div v-if="isEditing" class="pt-2 text-center">
                                <button type="button" @click="removerEquipamento" 
                                    class="text-red-500 text-[10px] font-black uppercase hover:underline">
                                    Remover este equipamento permanentemente
                                </button>
                            </div>

                            <div class="flex gap-4 pt-6">
                                <button @click="fecharModalCriar" type="button" class="flex-1 bg-gray-200 text-gray-700 font-black uppercase py-4 rounded-2xl">Cancelar</button>
                                <button type="submit" class="flex-1 bg-blue-600 text-white font-black uppercase py-4 rounded-2xl shadow-lg">
                                    {{ isEditing ? 'Salvar Alterações' : 'Confirmar' }}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </Transition>

            <!--Modal Confirma Reserva-->
            <Transition name="fade">
                <div v-if="mostrarModalConfirmar" class="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                    <div class="bg-white rounded-[35px] w-full max-w-md shadow-2xl p-8 border border-white/50">
                        <h3 class="text-2xl font-black text-gray-900 uppercase italic mb-6">Confirmar Reserva</h3>
                        
                        <div class="space-y-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div class="flex justify-between border-b pb-2">
                                <span class="text-[10px] font-bold text-gray-500 uppercase">Usuário</span>
                                <span class="text-xs font-black text-blue-700 uppercase">{{ userName }}</span>
                            </div>
                            <div class="flex justify-between border-b pb-2">
                                <span class="text-[10px] font-bold text-gray-500 uppercase">Equipamento</span>
                                <span class="text-xs font-black text-gray-800 uppercase">{{ reservaAtiva?.nome }}</span>
                            </div>
                            <div class="space-y-4 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <div class="flex flex-col gap-3">
                                    <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Período da Reserva</span>
                                    
                                    <div class="space-y-1">
                                        <label class="text-[9px] font-black text-blue-600 uppercase ml-1">Início</label>
                                        <input 
                                            v-model="dataInicioSelecionada" 
                                            type="datetime-local" 
                                            class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-blue-500 transition"
                                        />
                                    </div>

                                    <div class="space-y-1">
                                        <label class="text-[9px] font-black text-blue-600 uppercase ml-1">Término</label>
                                        <input 
                                            v-model="dataFimSelecionada" 
                                            type="datetime-local" 
                                            class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-blue-500 transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <button @click="mostrarModalConfirmar = false" class="flex-1 bg-gray-200 text-gray-700 font-black uppercase py-4 rounded-2xl hover:bg-gray-300 transition">Cancelar</button>
                            <button @click="confirmarReserva" class="flex-1 bg-blue-600 text-white font-black uppercase py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition">Confirmar</button>
                        </div>
                    </div>
                </div>
            </Transition>

        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import api from '@/services/api';
import socket from '@/services/socket';
import { notify } from '@/utils/notificacoes';

const userName = ref('Nome');
const userInitial = ref('A');
const listaEquipamentos = ref([]);

const mostrarModalConfirmar = ref(false);
const reservaAtiva = ref(null); 
const usuarioLogado = ref({}); // Mostrar nome/email no resumo

const dataInicioSelecionada = ref('');
const dataFimSelecionada = ref('');

// Constante para tarbalahr com o estado de Editar e Remover
const isEditing = ref(false); // Define se o modal é para Edição ou Criação
const equipamentoForm = ref({ id_equip: null, nome: '', numero_serie: '', observacao: '', status: 'Disponível' });

// Modal de Realizar Reserva
const prepararReserva = (equipamento) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    usuarioLogado.value = userData;
    
    const agora = new Date();
    const umaHoraDepois = new Date(agora.getTime() + 3600000);

    // Formata para o padrão datetime-local  (AAAA-MM-DDTHH:MM)
    dataInicioSelecionada.value = agora.toISOString().slice(0, 16);
    dataFimSelecionada.value = umaHoraDepois.toISOString().slice(0, 16);

    reservaAtiva.value = { ...equipamento };
    mostrarModalConfirmar.value = true;
};

const confirmarReserva = async () => {
    // Validação data fim não pode ser antes da início
    if (new Date(dataFimSelecionada.value) <= new Date(dataInicioSelecionada.value)) {
        notify('Atenção', 'A data de término deve ser posterior à de início!', 'warning');
        return;
    }

    try {
        const payload = { 
            id_equip: reservaAtiva.value.id_equip, 
            data_inicio: dataInicioSelecionada.value, 
            data_fim: dataFimSelecionada.value,      
            observacao: "Reserva realizada pelo painel de controle"
        };

        await api.post('/reservas/', payload);
        
        mostrarModalConfirmar.value = false;
        await carregarDados();
        notify('Reservado!', 'Sua reserva foi confirmada com sucesso.', 'success');
    } catch (e) { 
        notify('Erro na Reserva', e.response?.data?.error || 'Falha na conexão', 'error');
    }
};

// CONTROLE DA MODAL
const mostrarModalCriar = ref(false);

const statusClass = (status) => {
    if (!status) return 'bg-red-100 text-red-700 border-red-200';
    const s = status.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (s === 'DISPONIVEL') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'RESERVADO') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (s === 'MANUTENCAO') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-red-100 text-red-700 border-red-200';
};

const podeReservar = (status) => {
    if (!status) return false;
    const s = status.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return s === 'DISPONIVEL';
};

const carregarDados = async () => {
    try {
        const response = await api.get('/equipamentos/');
        listaEquipamentos.value = response.data;
    } catch (e) { console.error("Erro Front carregarDados:", e); }
};

const abrirModalCriar = () => {
    isEditing.value = false;
    equipamentoForm.value = { id_equip: null, nome: '', numero_serie: '', observacao: '', status: 'Disponível' };
    mostrarModalCriar.value = true;
};

const abrirModalEditar = (item) => {
    isEditing.value = true;
    // Criamos uma cópia para não editar direto na tabela!!
    equipamentoForm.value = { ...item }; 
    mostrarModalCriar.value = true;
};

const salvarEquipamento = async () => {
    try {
        if (isEditing.value) {
            await api.put(`/equipamentos/${equipamentoForm.value.id_equip}`, equipamentoForm.value);
            notify('Atualizado', 'Equipamento atualizado com sucesso!', 'success');
        } else {
            await api.post('/equipamentos/', equipamentoForm.value);
            notify('Cadastrado', 'Novo equipamento adicionado!', 'success');
        }
        fecharModalCriar();
        await carregarDados();
    } catch (e) {
        notify('Erro', e.response?.data?.error || 'Falha na operação', 'error');
    }
};

// REMOVER Equipamento
const removerEquipamento = async () => {
    const confirmacao = await notify(
        'Tem certeza?', 
        'Isso excluirá o equipamento permanentemente!', 
        'warning'
    );
    
    if (confirmacao.isConfirmed) {
        try {
            await api.delete(`/equipamentos/${equipamentoForm.value.id_equip}`);
            fecharModalCriar();
            await carregarDados();
            notify('Removido', 'Equipamento excluído.', 'success');
        } catch (e) {
            notify('Erro', 'Não foi possível remover.', 'error');
        }
    }
};

// CANCECLAR Reserva
const handleCancelarReserva = async (item) => {
    const confirmacao = await notify(
        'Cancelar Reserva?',
        `Deseja realmente liberar o equipamento: ${item.nome}?`,
        'warning'
    );

    if (confirmacao.isConfirmed) {
        try {
            
            await api.delete(`/reservas/${item.id_reserva_ativa}`);
            
            await carregarDados();
            notify('Sucesso', 'Reserva cancelada e equipamento liberado!', 'success');
        } catch (e) {
            notify('Erro', 'Não foi possível cancelar a reserva.', 'error');
            console.error(e);
        }
    }
};

const fecharModalCriar = () => { mostrarModalCriar.value = false; };

onMounted(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        userName.value = user.nome || 'Nome';
        userInitial.value = userName.value.charAt(0).toUpperCase();
    }
    carregarDados();
    socket.on("atualizar_lista", carregarDados);
});

onUnmounted(() => { socket.off("atualizar_lista"); });

</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>