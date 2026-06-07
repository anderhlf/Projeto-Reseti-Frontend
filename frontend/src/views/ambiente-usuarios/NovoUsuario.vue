<template>
  <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
    style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

    <Sidebar />

    <main class="flex-1 p-8 overflow-x-hidden flex flex-col text-gray-800 relative">

      <header class="flex justify-end items-center mb-6">
        <div class="flex items-center gap-4 bg-white/90 p-1.5 rounded-full border border-white/50 pr-8 shadow-xl">
          <div
            class="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md uppercase">
            {{ inicialUsuario }}
          </div>
          <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ nomeUsuario }}</span>
        </div>
      </header>

      <div
        class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl flex-1 flex flex-col">

        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">
              {{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}
            </h2>
            <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest mt-1">
              {{ isEditing ? 'Atualize os dados do usuário selecionado' : 'Preencha os dados para cadastrar' }}
            </p>
          </div>

          <button @click="router.push('/usuarios')" type="button"
            class="bg-gray-800 hover:bg-black text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition active:scale-95">
            Voltar
          </button>
        </div>

        <div v-if="carregando" class="flex-1 flex items-center justify-center">
          <p class="text-xs font-black text-gray-400 uppercase tracking-widest">Carregando dados...</p>
        </div>

        <form v-else @submit.prevent="salvarUsuario"
          class="flex-1 flex flex-col max-w-3xl w-full mx-auto space-y-6">

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              Nome
            </label>
            <input v-model="formulario.nome" type="text" placeholder="Ex: Maria Silva" required
              class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition" />
          </div>

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              E-mail
            </label>
            <input v-model="formulario.email" type="email" placeholder="Ex: maria@reseti.com" required
              class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition" />
          </div>

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              Setor / Curso
            </label>
            <input v-model="formulario.setor_curso" type="text" placeholder="Ex: Informática"
              class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition" />
          </div>

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              Permissão
            </label>
            <div class="relative">
              <select v-model="formulario.permissao" required
                class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition appearance-none cursor-pointer">
                <option value="Comum">Comum</option>
                <option value="Adm">Administrador</option>
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              {{ isEditing ? 'Nova Senha' : 'Senha' }}
              <span v-if="isEditing" class="text-gray-400 normal-case">(opcional)</span>
            </label>
            <input v-model="formulario.senha" type="password"
              :placeholder="isEditing ? 'Deixe em branco para manter a atual' : 'Senha de acesso'"
              :required="!isEditing"
              class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition" />
          </div>

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              Status
            </label>
            <div class="relative">
              <select v-model="formulario.status" required
                class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition appearance-none cursor-pointer">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div class="pt-4 flex justify-end">
            <button type="submit" :disabled="salvando"
              class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-black uppercase px-10 py-4 rounded-xl shadow-lg shadow-blue-600/30 transition active:scale-95">
              {{ salvando ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Confirmar Cadastro') }}
            </button>
          </div>

        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import api from '@/services/api';
import { inicialUsuario, nomeUsuario, ehAdmin, atualizarUsuario } from '@/services/auth';
import { notify } from '@/utils/notificacoes';
import { validarEmailBasico } from '@/utils/validador';

const router = useRouter();
const route = useRoute();

const carregando = ref(false);
const salvando = ref(false);

const isEditing = computed(() => !!route.params.id);

const formulario = reactive({
  id_user: null,
  nome: '',
  email: '',
  setor_curso: '',
  permissao: 'Comum',
  senha: '',
  status: 'Ativo',
});

const carregarUsuario = async (id) => {
  carregando.value = true;

  try {
    const response = await api.get(`/usuarios/${id}`);
    const usuario = response.data;

    formulario.id_user = usuario.id_user;
    formulario.nome = usuario.nome;
    formulario.email = usuario.email;
    formulario.setor_curso = usuario.setor_curso || '';
    formulario.permissao = usuario.permissao || 'Comum';
    formulario.senha = '';
    formulario.status = usuario.status || 'Ativo';
  } catch (erro) {
    notify('Erro', erro.response?.data?.error || 'Não foi possível carregar o usuário.', 'error');
    router.push('/usuarios');
  } finally {
    carregando.value = false;
  }
};

const salvarUsuario = async () => {
  const validacaoEmail = validarEmailBasico(formulario.email);
  if (!validacaoEmail.valido) {
    notify('Atenção', 'Informe um e-mail válido.', 'warning');
    return;
  }

  const payload = {
    nome: formulario.nome.trim(),
    email: validacaoEmail.formatado,
    setor_curso: formulario.setor_curso.trim(),
    permissao: formulario.permissao,
    status: formulario.status,
  };

  salvando.value = true;

  try {
    if (isEditing.value) {
      if (formulario.senha) {
        payload.senha = formulario.senha;
      }

      const response = await api.put(`/usuarios/${formulario.id_user}`, payload);
      const usuarioAtualizado = response.data?.user || {
        id_user: formulario.id_user,
        ...payload,
      };

      atualizarUsuario(usuarioAtualizado);
      notify('Atualizado', 'Usuário atualizado com sucesso!', 'success');
    } else {
      if (!formulario.senha) {
        notify('Atenção', 'A senha é obrigatória para novos usuários.', 'warning');
        return;
      }

      payload.senha = formulario.senha;
      await api.post('/usuarios/', payload);
      notify('Cadastrado', 'Novo usuário adicionado com sucesso!', 'success');
    }

    router.push('/usuarios');
  } catch (erro) {
    notify('Erro', erro.response?.data?.error || 'Falha na operação.', 'error');
  } finally {
    salvando.value = false;
  }
};

onMounted(() => {
  if (!ehAdmin()) {
    router.push('/dashboard');
    return;
  }

  if (isEditing.value) {
    carregarUsuario(route.params.id);
  }
});
</script>
