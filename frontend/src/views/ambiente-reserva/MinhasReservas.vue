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
                        <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">Minhas Reservas
                        </h2>
                        <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest">Histórico de
                            solicitações pessoais</p>
                    </div>
                    <button @click="$router.push('/reserva')"
                        class="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-black uppercase px-6 py-3 rounded-xl shadow-lg transition active:scale-95">
                        Reservar Novo Equipamento
                    </button>
                </div>

                <div class="overflow-x-auto flex-1">
                    <table class="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr class="text-[10px] font-black text-gray-500 uppercase tracking-widest px-6">
                                <th class="pl-6 pb-2">Equipamento</th>
                                <th class="pb-2">Início</th>
                                <th class="pb-2">Término</th>
                                <th class="pb-2 text-center">Status</th>
                                <th class="pr-6 pb-2 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="reserva in minhasReservas" :key="reserva.id_reserva"
                                class="bg-white/40 hover:bg-white/60 transition-colors shadow-sm rounded-2xl">
                                <td class="py-4 pl-6 font-bold text-gray-800 uppercase text-xs">{{ reserva.equipamento
                                    }}</td>
                                <td class="py-4 text-xs font-medium text-gray-600">{{ reserva.data_inicio }}</td>
                                <td class="py-4 text-xs font-medium text-gray-600">{{ reserva.data_fim }}</td>
                                <td class="py-4 text-center">
                                    <span :class="statusClass(reserva.status)"
                                        class="px-4 py-1.5 rounded-full text-[9px] font-black border uppercase">
                                        {{ reserva.status }}
                                    </span>
                                </td>
                                <td class="py-4 text-center pr-6">
                                    <button v-if="reserva.status === 'Ativa'" @click="cancelarMinhaReserva(reserva)"
                                        class="text-red-600 border border-red-200 hover:bg-red-50 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition">
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="minhasReservas.length === 0">
                                <td colspan="5" class="text-center py-10 text-gray-500 font-bold uppercase text-xs">
                                    Nenhuma reserva encontrada.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-8 pt-6 border-t border-gray-200/50">
                    <button @click="$router.go(-1)"
                        class="bg-gray-800 hover:bg-black text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition active:scale-95">Voltar</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';
import { notify } from '@/utils/notificacoes';

const minhasReservas = ref([]);
const userRaw = sessionStorage.getItem('user');
const user = userRaw && userRaw !== "[object Object]" ? JSON.parse(userRaw) : {};
const token = sessionStorage.getItem('token');

const userName = computed(() => user.nome || 'Usuário');
const userInitial = computed(() => user.nome ? user.nome.charAt(0) : 'U');

const fetchMinhasReservas = async () => {
    if (!user.id_user) return;

    try {
        const response = await axios.get(`http://localhost:5000/reservas/minhas-reservas/${user.id_user}`, {
            headers: { Authorization: `Bearer ${token}` } // Se você usar o token
        });
        minhasReservas.value = response.data;
    } catch (error) {
        notify('Erro', 'Falha ao carregar', 'error');
    }
};

const statusClass = (status) => {
    const classes = {
        'Ativa': 'bg-green-100 text-green-700 border-green-200',
        'Concluída': 'bg-blue-100 text-blue-700 border-blue-200',
        'Cancelada': 'bg-red-100 text-red-700 border-red-200',
        'Pendente': 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    return classes[status] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const cancelarMinhaReserva = async (reserva) => {
    const confirmacao = await notify('Cancelar Reserva?', `Deseja liberar o ${reserva.equipamento}?`, 'warning');

    if (confirmacao.isConfirmed) {
        try {
            // Aqui você chamaria sua rota de cancelamento
            await axios.put(`http://localhost:5000/cancelar-reserva/${reserva.id_reserva}`);
            notify('Sucesso', 'Reserva cancelada com sucesso!');
            fetchMinhasReservas(); // Atualiza a lista
        } catch (error) {
            notify('Erro', 'Erro ao cancelar reserva', 'error');
        }
    }
};

onMounted(fetchMinhasReservas);
</script>
