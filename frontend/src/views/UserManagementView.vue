<template>
  <div class="min-h-screen flex font-sans bg-cover bg-center bg-no-repeat bg-fixed"
    style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070');">

    <Sidebar />

    <main class="flex-1 p-10">
      <header class="flex justify-end mb-8">
        <div class="flex items-center gap-4 bg-white/80 p-2 rounded-full border border-white/50 pr-6 shadow-xl">
          <div class="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center font-bold text-white uppercase">{{ userInitial }}</div>
          <span class="font-extrabold text-gray-800 uppercase">{{ userName }}</span>
        </div>
      </header>

      <div class="bg-white/80 backdrop-blur-xl rounded-[30px] border border-white/50 p-8 shadow-xl">
        <h2 class="text-3xl font-black text-gray-900 uppercase mb-10 px-4">Gerenciar Usuários</h2>
        <table class="w-full text-left border-separate border-spacing-y-4">
          <thead><tr class="text-blue-700 uppercase text-[11px] font-black tracking-widest"><th class="pl-8">Nome</th><th>E-mail</th><th class="text-center">Ações</th></tr></thead>
          <tbody>
            <tr class="bg-white/50 rounded-3xl group">
              <td class="py-5 pl-8 rounded-l-[20px] font-bold">Anderson Holanda</td>
              <td class="py-5 italic">anderson@reseti.com</td>
              <td class="py-5 text-center rounded-r-[20px]"><button class="text-blue-600 font-black text-xs uppercase">Editar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
const userName = ref(''); const userInitial = ref('');
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) { userName.value = user.nome; userInitial.value = userName.value.charAt(0).toUpperCase(); }
});
</script>