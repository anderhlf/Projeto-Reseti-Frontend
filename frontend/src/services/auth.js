import { ref, computed } from 'vue';

const CHAVE_USUARIO = 'user';
const CHAVE_TOKEN = 'token';

const lerUsuarioStorage = () => {
    const dados = sessionStorage.getItem(CHAVE_USUARIO);
    if (!dados || dados === '[object Object]') return null;

    try {
        return JSON.parse(dados);
    } catch {
        return null;
    }
};

const usuarioAtual = ref(lerUsuarioStorage());
const tokenAtual = ref(sessionStorage.getItem(CHAVE_TOKEN) || null);

export const usuario = usuarioAtual;

export const inicialUsuario = computed(
    () => usuarioAtual.value?.nome?.charAt(0).toUpperCase() || 'A',
);

export const nomeUsuario = computed(() => usuarioAtual.value?.nome || 'Nome');

export const getUsuario = () => usuarioAtual.value || lerUsuarioStorage();

export const getToken = () => tokenAtual.value || sessionStorage.getItem(CHAVE_TOKEN);

export const estaLogado = () => !!getUsuario();

export const ehAdmin = () => getUsuario()?.permissao === 'Adm';

export const setSessao = (token, dadosUsuario) => {
    sessionStorage.setItem(CHAVE_TOKEN, token);
    sessionStorage.setItem(CHAVE_USUARIO, JSON.stringify(dadosUsuario));

    tokenAtual.value = token;
    usuarioAtual.value = dadosUsuario;

    window.dispatchEvent(
        new CustomEvent('usuario-sessao-atualizado', { detail: dadosUsuario }),
    );
};

export const atualizarUsuario = (dadosAtualizados) => {
    const usuarioLogado = getUsuario();
    if (!usuarioLogado || usuarioLogado.id_user !== dadosAtualizados.id_user) return;

    const usuarioSessao = {
        ...usuarioLogado,
        nome: dadosAtualizados.nome,
        email: dadosAtualizados.email,
        setor_curso: dadosAtualizados.setor_curso,
        permissao: dadosAtualizados.permissao,
        status: dadosAtualizados.status,
    };

    sessionStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuarioSessao));
    usuarioAtual.value = usuarioSessao;

    window.dispatchEvent(
        new CustomEvent('usuario-sessao-atualizado', { detail: usuarioSessao }),
    );
};

export const limparSessao = () => {
    sessionStorage.removeItem(CHAVE_TOKEN);
    sessionStorage.removeItem(CHAVE_USUARIO);

    tokenAtual.value = null;
    usuarioAtual.value = null;
};
