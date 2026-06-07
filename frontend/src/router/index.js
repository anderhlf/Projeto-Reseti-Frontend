import { createRouter, createWebHistory } from "vue-router";
import { estaLogado, ehAdmin } from "@/services/auth";
import LoginView from "../views/autenticacao/LoginView.vue";
import RegisterView from "../views/autenticacao/RegisterView.vue";
import ForgotPasswordView from "../views/autenticacao/ForgotPasswordView.vue";
import DashboardView from "../views/DashboardView.vue";
import ReserveView from "../views/ambiente-reserva/ReserveView.vue"; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/cadastro",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/redefinir-senha",
      name: "forgot-password",
      component: ForgotPasswordView,
    },
    {
      path: '/reset-senha/:token',
      name: 'ResetSenha',
      component: () => import('../views/autenticacao/ResetSenha.vue')
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: "/reserva",
      name: "reserva",
      component: ReserveView,
      meta: { requiresAuth: true }
    },
    {
      path: '/minhas-reservas',
      name: 'MinhasReservas',
      component: () => import('@/views/ambiente-reserva/MinhasReservas.vue'),
      meta: { requiresAuth: true }
    },
    {
    path: '/solicitacoes',
    name: 'Solicitacoes',
    component: () => import('../views/ambiente-reserva/SolicitacoesView.vue'),
    meta: { requiresAuth: true }
    },
    {
      path: "/abertura-os",
      name: "AberturaOS",
      component: () => import('../views/ambiente-os/AberturaOSView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/nova-os",
      name: "NovaOS",
      component: () => import('@/views/ambiente-os/NovaOS.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/minhas-os',
      name: 'MinhasOS',
      component: () => import('@/views/ambiente-os/MinhasOS.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/solicitacoes-os',
      name: 'VerSolicitacaoOS',
      component: () => import('@/views/ambiente-os/VerSolicitacao.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/usuarios",
      name: "GerenciadorUsuario",
      component: () => import('../views/ambiente-usuarios/Usuarios.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/usuarios/novo",
      name: "NovoUsuario",
      component: () => import('../views/ambiente-usuarios/NovoUsuario.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/usuarios/editar/:id",
      name: "EditarUsuario",
      component: () => import('../views/ambiente-usuarios/NovoUsuario.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !estaLogado()) {
    next('/');
  } else if (to.matched.some(record => record.meta.requiresAdmin) && !ehAdmin()) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
