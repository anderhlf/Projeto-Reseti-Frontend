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
                        <button @click="irParaSolicitacoes" class="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black uppercase px-6 py-3 rounded-xl shadow-lg transition active:scale-95">
                            Ver Solicitações
                        </button>
                        <button @click="abrirModalCriar" class="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black uppercase px-6 py-3 rounded-xl shadow-lg transition active:scale-95">
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
                                    <button @click="fazerReserva(item.id_equip)" :disabled="!podeReservar(item.status)"
                                        :class="podeReservar(item.status) ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                                        class="text-[9px] font-black uppercase px-5 py-2.5 rounded-xl shadow-md transition active:scale-95">
                                        Realizar Reserva
                                    </button>
                                </td>
                                <td class="py-4 text-center pr-6">
                                    <div class="flex justify-center gap-2">
                                        <button class="text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase transition">Edit</button>
                                        <button class="text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase transition">Cancelar</button>
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
                            <h3 class="text-2xl font-black text-gray-950 uppercase tracking-tighter italic">Novo Equipamento</h3>
                            <div class="h-1.5 w-16 bg-purple-600 mt-2 rounded-full"></div>
                        </div>

                        <form @submit.prevent="salvarNovoEquipamento" class="space-y-5">
                            <div class="space-y-1">
                                <label class="text-[10px] font-black text-gray-600 uppercase ml-2 tracking-widest">Nome Equipamento</label>
                                <input v-model="novoEquipamento.nome" type="text" placeholder="Ex: Notebook Dell" required
                                    class="w-full bg-white border border-gray-200 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition" />
                            </div>

                            <div class="space-y-1">
                                <label class="text-[10px] font-black text-gray-600 uppercase ml-2 tracking-widest">Número de Série</label>
                                <input v-model="novoEquipamento.numero_serie" type="text" placeholder="Ex: SN-998877" required
                                    class="w-full bg-white border border-gray-200 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition" />
                            </div>

                            <div class="space-y-1">
                                <label class="text-[10px] font-black text-gray-600 uppercase ml-2 tracking-widest">Observação</label>
                                <textarea v-model="novoEquipamento.observacao" placeholder="Detalhes adicionais..." rows="2"
                                    class="w-full bg-white border border-gray-200 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition resize-none"></textarea>
                            </div>

                            <div class="space-y-1">
                                <label class="text-[10px] font-black text-gray-600 uppercase ml-2 tracking-widest">Status: Select</label>
                                <select v-model="novoEquipamento.status" required
                                    class="w-full bg-white border border-gray-200 focus:border-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition appearance-none">
                                    <option value="Disponível">DISPONÍVEL</option>
                                    <option value="Manutenção">MANUTENÇÃO</option>
                                    <option value="Reservado">RESERVADO</option>
                                </select>
                            </div>

                            <div class="flex gap-4 pt-6">
                                <button @click="fecharModalCriar" type="button" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-black uppercase py-4 rounded-2xl transition active:scale-95">Cancelar</button>
                                <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase py-4 rounded-2xl shadow-lg transition active:scale-95">Confirmar</button>
                            </div>
                        </form>
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

const userName = ref('Nome');
const userInitial = ref('A');
const listaEquipamentos = ref([]);

// CONTROLE DA MODAL
const mostrarModalCriar = ref(false);
const novoEquipamento = ref({ 
    nome: '', 
    numero_serie: '', 
    observacao: '', 
    status: 'Disponível' 
});

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
    novoEquipamento.value = { nome: '', numero_serie: '', observacao: '', status: 'Disponível' };
    mostrarModalCriar.value = true;
};

const fecharModalCriar = () => { mostrarModalCriar.value = false; };

const salvarNovoEquipamento = async () => {
    try {
        // Envia campos compatíveis com data.get() do Python
        await api.post('/equipamentos/', novoEquipamento.value);
        fecharModalCriar();
        await carregarDados(); 
        alert("Equipamento cadastrado com sucesso!");
    } catch (e) { 
        alert(e.response?.data?.error || "Erro ao salvar equipamento"); 
    }
};
const fazerReserva = async (id_equip) => {
    try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return alert("Usuário não identificado.");
        const user = JSON.parse(storedUser);

        const dataInicio = new Date().toISOString().split('.')[0]; 
        const dataFim = new Date(Date.now() + 3600000).toISOString().split('.')[0]; 

        const payload = { 
            id_equip: id_equip, 
            id_user: user.id_user || user.id_usuario, 
            data_inicio: dataInicio,
            data_fim: dataFim,
            observacao: "Reserva realizada pelo painel de controle"
        };

        console.log("Enviando para o Back:", payload);

        const response = await api.post('/reservas/', payload);
        
        await carregarDados();
        alert("Reserva realizada com sucesso!");
    } catch (e) { 
        const erroMensagem = e.response?.data?.error || "Erro interno no servidor (500)";
        alert("Erro na reserva: " + erroMensagem);
        console.error("Traceback do erro:", e.response);
    }
};

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