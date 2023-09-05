<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'radix-vue'

const toggleState = ref(false)
const checkboxOne = ref(false)

function handleClick() {
  alert('hello!')
}
</script>

<template>
  <DropdownMenuRoot v-model:open="toggleState">
    <DropdownMenuTrigger
      class="w-7 h-7 rounded-full ring-2 focus-visible:ring-gray-900 focus-visible:dark:ring-gray-300 ring-white dark:ring-gray-700/50 inline-flex items-center justify-center focus:shadow focus:shadow-black cursor-pointer bg-gray-100 dark:bg-gray-900 hover:bg-opacity-60 outline-none"
      aria-label="Customise options"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          class="fill-gray-800 dark:fill-gray-50"
          d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm-6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"
        />
      </svg>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        class="min-w-[220px] outline-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 dark:text-white rounded-md p-2 shadow will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5"
        side="left"
        align="center"
      >
        <DropdownMenuItem
          value="New Tab"
          class="group text-xs leading-none focus-visible:bg-gray-200 text-gray-700 dark:text-gray-300 focus-visible:dark:text-gray-900 rounded flex items-center h-6 px-2 relative select-none outline-none data-[disabled]:text-gray-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-gray-900"
          @click="handleClick"
        >
          New Tab
          <div
            class="ml-auto pl-[20px] text-gray-800 group-data-[highlighted]:text-gray-700 group-data-[disabled]:text-gray-900 dark:text-gray-300"
          >
            ⌘+T
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          value="New Window"
          class="group text-xs leading-none focus-visible:bg-gray-200 text-gray-700 dark:text-gray-300 focus-visible:dark:text-gray-900 rounded flex items-center h-6 px-2 relative select-none outline-none data-[disabled]:text-gray-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-gray-900"
        >
          New Window
          <div
            class="ml-auto pl-[20px] text-gray-800 group-data-[highlighted]:text-gray-700 group-data-[disabled]:text-gray-900 dark:text-gray-300"
          >
            ⌘+N
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          value="New Private Window"
          class="group text-xs leading-none focus-visible:bg-gray-200 text-gray-700 dark:text-gray-300 focus-visible:dark:text-gray-900 rounded flex items-center h-6 px-2 relative select-none outline-none data-[disabled]:text-gray-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-gray-900"
        >
          New Private Window
          <div
            class="ml-auto pl-[20px] text-gray-800 group-data-[highlighted]:text-gray-700 group-data-[disabled]:text-gray-900 dark:text-gray-300"
          >
            ⇧+⌘+N
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator class="h-[1px] bg-green6 m-[5px]" />
        <DropdownMenuCheckboxItem
          v-model:checked="checkboxOne"
          class="group text-xs leading-none focus-visible:bg-gray-200 text-gray-700 dark:text-gray-300 focus-visible:dark:text-gray-900 rounded flex items-center h-6 px-2 pl-6 relative select-none outline-none data-[disabled]:text-gray-900 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-gray-900"
          :class="checkboxOne ? '  ' : '!pl-2' "
        >
          <DropdownMenuItemIndicator
            class="absolute left-0 w-6 inline-flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15">
              <path
                fill="#888888"
                fill-rule="evenodd"
                d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181Z"
                clip-rule="evenodd"
              />
            </svg>
          </DropdownMenuItemIndicator>
          Show Bookmarks
          <div
            class="ml-auto pl-[20px] text-gray-800 group-data-[highlighted]:text-gray-700 group-data-[disabled]:text-gray-900 dark:text-gray-300"
          >
            ⌘+B
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
