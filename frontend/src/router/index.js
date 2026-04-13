import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import DashboardView from "../views/DashboardView.vue";
// PASSO 1: Importar a tela de reserva que criamos
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
// PASSO 2: Registrar a rota de redefinição
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
// PASSO 3: Registrar a rota do Dashboard para quando você logar
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
// PASSO NOVO: Registrar a rota da Reserva para o botão funcionar
    {
      path: "/reserva",
      name: "reserva",
      component: ReserveView,
    },
    {
      path: '/minhas-reservas',
      name: 'MinhasReservas',
      component: () => import('@/views/MinhasReservas.vue')
    },
    {
      path: "/abertura-os",
      name: "AberturaOS",
      component: () => import('../views/AberturaOSView.vue') 
    },
    {
      path: "/usuarios",
      name: "GerenciadorUsuario",
      component: () => import('../views/UserManagementView.vue')
    },
  ],
});

export default router;
