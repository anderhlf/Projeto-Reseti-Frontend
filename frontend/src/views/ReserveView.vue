<template>
    <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
        style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

        <Sidebar />

        <main class="flex-1 p-8 overflow-x-hidden flex flex-col text-gray-800">

            <header class="flex justify-end items-center mb-6">
                <div
                    class="flex items-center gap-4 bg-white/90 p-1.5 rounded-full border border-white/50 pr-8 shadow-xl">
                    <div
                        class="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md uppercase">
                        {{ userInitial }}</div>
                    <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ userName }}</span>
                </div>
            </header>

            <div
                class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl flex-1 flex flex-col">

                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">Área de Reserva
                        </h2>
                        <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest">Tabelas dos
                            Equipamentos</p>
                    </div>

                    <div class="flex gap-3">
                        <button @click="irParaSolicitacoes"
                            class="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black uppercase px-6 py-3 rounded-xl shadow-lg transition">Ver
                            Solicitações</button>
                        <button @click="irParaCriar"
                            class="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black uppercase px-6 py-3 rounded-xl shadow-lg transition">Criar
                            Equipamento</button>
                    </div>
                </div>

                <div class="overflow-x-auto flex-1">
                    <table class="w-full text-left border-separate border-spacing-y-3">
                        <tbody>
                            <tr v-for="item in listaEquipamentos" :key="item.id"
                                class="bg-white/40 hover:bg-white/60 transition-colors shadow-sm rounded-2xl">
                                <td class="py-4 pl-6 font-bold text-gray-800 uppercase text-xs">{{ item.nome }}</td>
                                <td class="py-4 text-center">
                                    <span :class="statusClass(item.status)"
                                        class="px-4 py-1.5 rounded-full text-[9px] font-black border uppercase">
                                        {{ item.status }}
                                    </span>
                                </td>
                                <td class="py-4 text-center">
                                    <button 
                                        @click="fazerReserva(item.id)" 
                                        :disabled="!podeReservar(item.status)"
                                        :class="podeReservar(item.status) 
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30' 
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                                        class="text-[9px] font-black uppercase px-5 py-2.5 rounded-xl shadow-md transition"
                                    >
                                        Realizar Reserva
                                    </button>
                                </td>
                                <td class="py-4 text-center pr-6">
                                    <div class="flex justify-center gap-2">
                                        <button
                                            class="text-blue-600 border border-blue-200 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Edit</button>
                                        <button
                                            class="text-red-600 border border-red-200 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Cancelar</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-8 flex justify-between items-center border-t border-gray-200/50 pt-6">
                    <button @click="$router.go(-1)"
                        class="bg-gray-800 text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition">Voltar</button>
                    <button
                        class="bg-blue-800 text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition">Minhas
                        Reservas</button>
                </div>
            </div>
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

const statusClass = (status) => {
    if (!status) return 'bg-red-100 text-red-700 border-red-200';
    const s = status.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    console.log("Status processado:", s); // TESTE

    if (s === 'DISPONIVEL') {
        return 'bg-green-100 text-green-700 border-green-200';
    }
    
    if (s === 'RESERVADO') {
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }

    if (s === 'MANUTENCAO') {
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }

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
    } catch (e) { console.error(e); }
};

const fazerReserva = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        await api.post('/reservas/', { id_equipamento: id, id_usuario: user.id });
        
        await carregarDados(); 
        
        alert("Reserva concluída com sucesso!");
    } catch (e) { 
        alert("Erro na reserva"); 
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

    socket.on("atualizar_lista", () => {
        console.log("Recebi o sinal do servidor! Atualizando tabela...");
        carregarDados();
    });

});
onUnmounted(() => {
    socket.off("atualizar_lista");
});


</script>