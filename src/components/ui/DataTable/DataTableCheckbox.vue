<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'radix-vue'

const checkboxOne = ref(false)
</script>

<template>
  <div class="flex justify-center items-center gap-2.5">
    <label
      class="flex focus-visible:ring-2 flex-row gap-4 items-center [&>.checkbox]:hover:bg-gray-100"
    >
      <CheckboxRoot
        v-model="checkboxOne"
        class="border flex h-5 w-5 appearance-none items-center justify-center rounded-sm bg-white dark:bg-gray-900 dark:border-gray-700 shadow outline-none focus-within:shadow-sm focus-visible:shadow-lg focus-visible:shadow-destructive"
      >
        <CheckboxIndicator
          class="bg-white dark:bg-gray-900 cursor-pointer dark:border-gray-700 h-full w-full rounded flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 text-gray-900"
            width="32"
            height="32"
            viewBox="0 0 15 15"
          >
            <path
              class="fill-gray-900 dark:fill-gray-100"
              fill-rule="evenodd"
              d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181Z"
              clip-rule="evenodd"
            />
          </svg>
        </CheckboxIndicator>
      </CheckboxRoot>
    </label>
  </div>
</template>
