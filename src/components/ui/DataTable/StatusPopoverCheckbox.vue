<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'radix-vue'
import slugify from '@/components/slugify'

const props = defineProps<{
  msg: string
  value: number
  checked: boolean
}>()

const checkboxOne = ref(props.checked)

</script>

<template>
  <div class="flex px-2 py-2 focus-within:dark:bg-gray-800 focus-within:bg-gray-200 w-full justify-between items-center gap-1">
    <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-gray-100">
      <CheckboxRoot
        v-model="checkboxOne"
        class="border flex h-5 w-5 appearance-none items-center justify-center rounded-sm bg-white dark:bg-gray-900 dark:border-gray-700 shadow outline-none"
      >
        <CheckboxIndicator
          class="bg-black dark:bg-gray-100 cursor-pointer dark:border-gray-700 h-full w-full rounded flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            width="32"
            height="32"
            viewBox="0 0 15 15"
          >
            <path
              class="fill-gray-100 dark:fill-gray-900"
              fill-rule="evenodd"
              d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181Z"
              clip-rule="evenodd"
            />
          </svg>
        </CheckboxIndicator>
      </CheckboxRoot>
      <span class="select-none text-sm text-gray-900 dark:text-white">{{ msg }}</span>
    </label>
    <span :class="'item-' + slugify(msg)" class="font-mono w-6 justify-center items-center text-xs py-1 font-bold inline-flex rounded-md ">{{ value }}</span>
  </div>
</template>
