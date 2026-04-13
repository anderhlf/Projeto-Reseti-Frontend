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

      <div class="bg-white/80 backdrop-blur-xl rounded-[30px] border border-white/50 p-10 shadow-xl max-w-4xl mx-auto w-full">
        <h2 class="text-3xl font-black text-gray-900 uppercase mb-8 border-b-4 border-blue-600 pb-2 inline-block">Abrir OS</h2>
        <form class="space-y-6">
          <div class="space-y-2"><label class="block text-sm font-black text-gray-700 uppercase">Problema</label><input type="text" class="w-full p-4 rounded-2xl bg-white/60 border outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div class="space-y-2"><label class="block text-sm font-black text-gray-700 uppercase">Descrição</label><textarea rows="4" class="w-full p-4 rounded-2xl bg-white/60 border outline-none focus:ring-2 focus:ring-blue-500"></textarea></div>
          <button class="w-full bg-blue-600 text-white font-black py-4 rounded-full uppercase">Enviar Chamado</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
const userName = ref(''); const userInitial = ref('');
onMounted(() => {
  const userRaw = sessionStorage.getItem('user');
  const user = userRaw && userRaw !== "[object Object]" ? JSON.parse(userRaw) : {};
  if (user) { userName.value = user.nome; userInitial.value = userName.value.charAt(0).toUpperCase(); }
});
</script>