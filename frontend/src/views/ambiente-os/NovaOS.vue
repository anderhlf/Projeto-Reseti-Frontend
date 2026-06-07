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
          <span class="font-black text-sm text-gray-800 uppercase tracking-tighter">{{ usuario.nome }}</span>
        </div>
      </header>

      <div
        class="bg-white/80 backdrop-blur-xl rounded-[35px] border border-white/50 p-8 shadow-xl flex-1 flex flex-col">

        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">
              Nova Ordem de Serviço
            </h2>
            <p class="text-[10px] font-black text-blue-700 uppercase tracking-widest mt-1">
              Preencha os dados para abrir uma nova OS
            </p>
          </div>

          <button @click="router.go(-1)" type="button"
            class="bg-gray-800 hover:bg-black text-white text-[10px] font-black uppercase px-8 py-3 rounded-xl shadow-lg transition active:scale-95">
            Voltar
          </button>
        </div>

        <form @submit.prevent="enviarOS" class="flex-1 flex flex-col max-w-3xl w-full mx-auto space-y-6">

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              Tipo de Suporte
            </label>
            <div class="relative">
              <select v-model="formulario.tipo_suporte" required
                class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition appearance-none cursor-pointer">
                <option value="" disabled>Selecione o tipo</option>
                <option v-for="opcao in tiposSuporte" :key="opcao" :value="opcao">{{ opcao }}</option>
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
              Assunto
            </label>
            <input v-model="formulario.assunto" type="text" placeholder="Resumo breve do problema"
              maxlength="150" required
              class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition" />
          </div>

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              Descrição
            </label>
            <textarea v-model="formulario.descricao" rows="5"
              placeholder="Descreva detalhadamente o problema ou solicitação" required
              class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition resize-none"></textarea>
          </div>

          <div class="space-y-1">
            <label class="block text-[10px] font-black text-blue-700 uppercase tracking-widest ml-1">
              Prioridade
            </label>
            <div class="relative">
              <select v-model="formulario.prioridade" required
                class="w-full bg-white/60 border-2 border-blue-600/20 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:border-blue-600 transition appearance-none cursor-pointer">
                <option value="" disabled>Selecione a prioridade</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
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
              Anexo (opcional)
            </label>
            <input type="file" accept="image/*,.pdf,.doc,.docx" @change="selecionarArquivo"
              class="w-full bg-white/60 border-2 border-dashed border-blue-600/30 rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:border-blue-600 transition file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700" />
            <p v-if="nomeArquivo" class="text-[10px] font-bold text-gray-500 ml-1 mt-1">
              Arquivo selecionado: {{ nomeArquivo }}
            </p>
          </div>

          <div class="pt-4 flex justify-end">
            <button type="submit" :disabled="enviando"
              class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-black uppercase px-10 py-4 rounded-xl shadow-lg shadow-blue-600/30 transition active:scale-95">
              {{ enviando ? 'Enviando...' : 'Abrir Ordem de Serviço' }}
            </button>
          </div>

        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import api from '@/services/api';
import { usuario, inicialUsuario as inicialUsuarioAuth } from '@/services/auth';
import { notify } from '@/utils/notificacoes';

const router = useRouter();
const enviando = ref(false);
const arquivoAnexo = ref(null);
const nomeArquivo = ref('');

const tiposSuporte = [
  'Hardware',
  'Software',
  'Rede / Internet',
  'Impressora',
  'E-mail',
  'Acesso / Senha',
  'Outros',
];

const formulario = reactive({
  tipo_suporte: '',
  assunto: '',
  descricao: '',
  prioridade: '',
});

const inicialUsuario = inicialUsuarioAuth;

const selecionarArquivo = (evento) => {
  const arquivo = evento.target.files[0];
  if (arquivo) {
    arquivoAnexo.value = arquivo;
    nomeArquivo.value = arquivo.name;
  } else {
    arquivoAnexo.value = null;
    nomeArquivo.value = '';
  }
};

const enviarOS = async () => {
  if (!usuario.value.id_user) {
    notify('Erro', 'Usuário não identificado. Faça login novamente.', 'error');
    router.push('/');
    return;
  }

  if (!formulario.tipo_suporte || !formulario.assunto || !formulario.descricao || !formulario.prioridade) {
    notify('Atenção', 'Preencha todos os campos obrigatórios.', 'error');
    return;
  }

  enviando.value = true;

  try {
    const dadosFormulario = new FormData();
    dadosFormulario.append('id_user', usuario.value.id_user);
    dadosFormulario.append('tipo_suporte', formulario.tipo_suporte);
    dadosFormulario.append('assunto', formulario.assunto);
    dadosFormulario.append('descricao', formulario.descricao);
    dadosFormulario.append('prioridade', formulario.prioridade);

    if (arquivoAnexo.value) {
      dadosFormulario.append('anexo', arquivoAnexo.value);
    }

    const resposta = await api.post('/os/', dadosFormulario);

    if (resposta.status === 201) {
      notify('Sucesso', resposta.data.message || 'Ordem de Serviço aberta com sucesso!', 'success');
      router.push('/abertura-os');
    }
  } catch (erro) {
    const mensagemErro = erro.response?.data?.error
      || (erro.request && !erro.response ? 'Servidor indisponível ou erro de conexão.' : null)
      || 'Falha ao abrir a Ordem de Serviço.';
    notify('Erro', mensagemErro, 'error');
  } finally {
    enviando.value = false;
  }
};
</script>
