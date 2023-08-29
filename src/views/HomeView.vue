<script setup lang="ts">
import DataTable from '@/components/ui/DataTable/DataTable.vue'
import Dialog from '@/components/ui/Dialog/Dialog.vue'
</script>

<template>
  <main class="px-6 py-2 border border-gray-400/50 rounded-lg m-2 dark:text-white text-gray-900">
    <header class="flex items-center justify-between py-2">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <h2 class="text-muted-foreground">Here's a list of your tasks for this month!</h2>
      </div>
      <div class="flex gap-2">
        <Dialog />
      </div>
    </header>
    <section class="mb-6 mt-2">
      <DataTable />
    </section>
  </main>
</template>
