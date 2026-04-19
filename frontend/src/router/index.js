import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import DashboardView from "../views/DashboardView.vue";
import ReserveView from "../views/ReserveView.vue"; 

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
      component: () => import('../views/ResetSenha.vue')
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
      component: () => import('@/views/MinhasReservas.vue'),
      meta: { requiresAuth: true }
    },
    {
    path: '/solicitacoes',
    name: 'Solicitacoes',
    component: () => import('../views/SolicitacoesView.vue'),
    meta: { requiresAuth: true }
    },
    {
      path: "/abertura-os",
      name: "AberturaOS",
      component: () => import('../views/AberturaOSView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: "/usuarios",
      name: "GerenciadorUsuario",
      component: () => import('../views/UserManagementView.vue'),
      meta: { requiresAdmin: true }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = sessionStorage.getItem('user') // Verifica se existe usuário logado

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  const userData = sessionStorage.getItem('user');
  const user = userData && userData !== "[object Object]" ? JSON.parse(userData) : null;

  if (to.path === '/usuarios' && user?.permissao !== 'Adm') {
    // Se tentar entrar em usuários sem ser Adm, manda pro Dashboard
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
