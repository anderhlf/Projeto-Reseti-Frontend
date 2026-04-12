<template>
  <aside class="w-72 bg-white/75 backdrop-blur-2xl border-r border-white/30 flex flex-col p-6 h-screen sticky top-0 shrink-0 shadow-2xl">
    <div class="mb-12 px-4 text-center text-blue-700">
      <h1 class="text-4xl font-extrabold tracking-tighter drop-shadow-md uppercase italic">RESETI</h1>
    </div>

    <nav class="flex-1 space-y-3">
      <router-link to="/dashboard" 
        :class="[$route.path === '/dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-700 hover:bg-white/50', 'flex items-center gap-4 p-4 rounded-2xl transition group font-semibold text-sm']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link to="/reserva" 
        :class="[$route.path === '/reserva' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-700 hover:bg-white/50', 'flex items-center gap-4 p-4 rounded-2xl transition group font-semibold text-sm']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 11m8 4V5" />
        </svg>
        <span>Reserva Equipamento</span>
      </router-link>

      <router-link to="/abertura-os" 
        :class="[$route.path === '/abertura-os' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-700 hover:bg-white/50', 'flex items-center gap-4 p-4 rounded-2xl transition group font-semibold text-sm']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span>Abertura OS</span>
      </router-link>

      <router-link to="/usuarios" 
        :class="[$route.path === '/usuarios' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-700 hover:bg-white/50', 'flex items-center gap-4 p-4 rounded-2xl transition group font-semibold text-sm']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span>Gerenciador Usuário</span>
      </router-link>
    </nav>

    <button @click="handleLogout" class="mt-auto flex items-center gap-4 p-4 text-red-600 hover:bg-red-50 rounded-2xl transition font-bold text-sm">
      <span>Sair</span>
    </button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const handleLogout = () => { localStorage.clear(); router.push('/'); };
</script>