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

                        {{ inicialUsuario }}

                    </div>

                    <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ nomeUsuario }}</span>

                </div>

            </header>



            <div

                class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl flex-1 flex flex-col">

                <div class="flex justify-between items-center mb-6">

                    <div>

                        <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">

                            Gerenciamento de Usuários

                        </h2>

                        <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest">

                            Painel exclusivo do administrador

                        </p>

                    </div>



                    <button @click="router.push('/usuarios/novo')" type="button"

                        class="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 text-[13px] font-black uppercase px-6 py-3 rounded-xl shadow-lg transition active:scale-95">

                        + Novo Usuário

                    </button>

                </div>



                <div class="flex items-center gap-6 mb-8 px-4 py-3 border-b-2 border-blue-600/20">

                    <span class="text-xs font-black text-blue-700 uppercase tracking-tighter italic">Usuários</span>



                    <div class="flex-1 flex items-center gap-4">



                        <div class="relative flex-1 max-w-md">

                            <input v-model="searchQuery" type="text" placeholder="Digite o nome ou e-mail..."

                                class="w-full bg-transparent border-b-2 border-blue-600/30 focus:border-blue-600 px-2 py-1 text-xs font-bold outline-none transition" />

                            <span class="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600">

                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"

                                    stroke="currentColor">

                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"

                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

                                </svg>

                            </span>

                        </div>

                    </div>

                </div>



                <div class="overflow-x-auto flex-1">

                    <table class="w-full text-left border-separate border-spacing-y-3">

                        <thead>

                            <tr class="text-[10px] font-black text-gray-500 uppercase tracking-widest">

                                <th class="pl-6 pb-2">Nome</th>

                                <th class="pb-2">E-mail</th>

                                <th class="pb-2">Setor / Curso</th>

                                <th class="pb-2">Permissão</th>

                                <th class="pb-2 text-center">Status</th>

                                <th class="pb-2 text-center pr-6">Ações</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr v-if="usuariosPaginados.length === 0">

                                <td colspan="6" class="py-8 text-center text-xs font-bold text-gray-400 uppercase">

                                    Nenhum usuário encontrado

                                </td>

                            </tr>

                            <tr v-for="usuario in usuariosPaginados" :key="usuario.id_user"

                                class="bg-white/40 hover:bg-white/60 transition-colors shadow-sm rounded-2xl">

                                <td class="py-4 pl-6 font-bold text-gray-800 uppercase text-xs">{{ usuario.nome }}</td>

                                <td class="py-4 text-xs font-medium text-gray-600">{{ usuario.email }}</td>

                                <td class="py-4 text-xs font-medium text-gray-600 uppercase">{{ usuario.setor_curso || '—' }}</td>

                                <td class="py-4 text-xs font-black text-blue-700 uppercase">{{ usuario.permissao }}</td>

                                <td class="py-4 text-center">

                                    <span :class="statusClass(usuario.status)"

                                        class="px-4 py-1.5 rounded-full text-[9px] font-black border uppercase">

                                        {{ usuario.status }}

                                    </span>

                                </td>

                                <td class="py-4 text-center pr-6">

                                    <div class="flex justify-center gap-2">

                                        <button @click="router.push(`/usuarios/editar/${usuario.id_user}`)" type="button"

                                            title="Editar usuário"

                                            class="inline-flex items-center justify-center p-2 rounded-lg text-blue-600 border border-blue-200 hover:bg-blue-50 transition active:scale-95">

                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"

                                                viewBox="0 0 24 24" stroke="currentColor">

                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"

                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />

                                            </svg>

                                        </button>

                                        <button @click="confirmarRemocao(usuario)" type="button"

                                            title="Remover usuário"

                                            class="inline-flex items-center justify-center p-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50 transition active:scale-95">

                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"

                                                viewBox="0 0 24 24" stroke="currentColor">

                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"

                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />

                                            </svg>

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>



                <div class="mt-8 flex justify-between items-center border-t border-gray-200/50 pt-6">

                    <button @click="router.go(-1)" type="button"

                        class="bg-gray-800 hover:bg-black text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition active:scale-95">

                        Voltar

                    </button>



                    <div class="flex items-center gap-4">

                        <button @click="paginaAnterior" :disabled="paginaAtual === 1" type="button"

                            class="p-2 rounded-lg hover:bg-blue-50 disabled:opacity-20 transition-all text-blue-600">

                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"

                                stroke="currentColor">

                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"

                                    d="M15 19l-7-7 7-7" />

                            </svg>

                        </button>



                        <span class="text-[11px] font-black text-gray-500 uppercase tracking-widest">

                            Página {{ paginaAtual }} de {{ totalPaginas }}

                        </span>



                        <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas" type="button"

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

import { ref, computed, onMounted, watch } from 'vue';

import { useRouter } from 'vue-router';

import Sidebar from '@/components/Sidebar.vue';

import api from '@/services/api';

import { inicialUsuario, nomeUsuario, ehAdmin, estaLogado } from '@/services/auth';

import { notify } from '@/utils/notificacoes';



const router = useRouter();



const listaUsuarios = ref([]);

const searchQuery = ref('');

const paginaAtual = ref(1);

const itensPorPagina = 10;



const statusClass = (status) => {

    if (!status) return 'bg-red-100 text-red-700 border-red-200';

    const s = status.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (s === 'ATIVO') return 'bg-green-100 text-green-700 border-green-200';

    if (s === 'INATIVO') return 'bg-red-100 text-red-700 border-red-200';

    return 'bg-gray-100 text-gray-700 border-gray-200';

};



const usuariosFiltrados = computed(() => {

    const termo = searchQuery.value.toLowerCase().trim();

    return listaUsuarios.value.filter((usuario) => {

        const nome = (usuario.nome || '').toLowerCase();

        const email = (usuario.email || '').toLowerCase();

        return !termo || nome.includes(termo) || email.includes(termo);

    });

});



const totalPaginas = computed(() => {

    const total = Math.ceil(usuariosFiltrados.value.length / itensPorPagina);

    return total > 0 ? total : 1;

});



const usuariosPaginados = computed(() => {

    const inicio = (paginaAtual.value - 1) * itensPorPagina;

    const fim = inicio + itensPorPagina;

    return usuariosFiltrados.value.slice(inicio, fim);

});



const proximaPagina = () => {

    if (paginaAtual.value < totalPaginas.value) paginaAtual.value++;

};



const paginaAnterior = () => {

    if (paginaAtual.value > 1) paginaAtual.value--;

};



watch(searchQuery, () => {

    paginaAtual.value = 1;

});



const buscarUsuarios = async (manterPagina = false) => {

    try {

        listaUsuarios.value = [];



        const response = await api.get('/usuarios/');



        listaUsuarios.value = Array.isArray(response.data)

            ? response.data.map((usuario) => ({ ...usuario }))

            : [];



        if (!manterPagina) paginaAtual.value = 1;

    } catch (erro) {

        listaUsuarios.value = [];

        notify('Erro', erro.response?.data?.error || 'Não foi possível carregar os usuários.', 'error');

    }

};



const confirmarRemocao = async (usuario) => {
    const confirmacao = await notify(
        'Excluir Usuário?',
        `Deseja realmente excluir o usuário "${usuario.nome}"? Esta ação não pode ser desfeita.`,
        'warning',
    );

    if (!confirmacao.isConfirmed) return;

    try {
        await api.delete(`/usuarios/${usuario.id_user}`);
        notify('Removido', `Usuário ${usuario.nome} excluído com sucesso.`, 'success');
        listaUsuarios.value = [];
        await buscarUsuarios(true);
    } catch (erro) {
        notify('Erro', erro.response?.data?.error || 'Não foi possível remover o usuário.', 'error');
    }
};



onMounted(() => {

    if (!estaLogado()) {

        router.push('/');

        return;

    }



    if (!ehAdmin()) {

        router.push('/dashboard');

        return;

    }



    buscarUsuarios();

});

</script>


