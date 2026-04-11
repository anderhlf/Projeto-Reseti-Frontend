import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
// PASSO 1: Importar a nova tela que criamos
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import DashboardView from "../views/DashboardView.vue";

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
    // PASSO 3: Registrar a rota do Dashboard para quando você logar
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
  ],
});

export default router;
