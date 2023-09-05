<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
import { Button } from '@/components/ui/Button/Button'
import RadixIconSearch from '@/components/icons/RadixIconSearch.vue'
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'
import StatusPopoverCheckbox from './StatusPopoverCheckbox.vue'

import { ref } from 'vue'


const checkboxOne = ref(true)
const checkboxTwo = ref(false)
const checkboxThree = ref(false)

</script>

<template>
  <PopoverRoot>
    <PopoverTrigger asChild>
      <button :class="Button({ intent: 'outline', size: 'sm' })" aria-label="Update status">
        <IconPlusCircle />
        Status
        <div class="border-l border-gray-300 dark:border-gray-700 ml-1 pl-2 flex gap-2">
          <span class="bg-gray-200 text-xs px-2 rounded-md py-0.5 dark:bg-gray-800">To Do</span>
        </div>
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        align="start"
        :side-offset="5"
        class="rounded-md border dark:border-gray-700 w-56 bg-white dark:bg-gray-950 dark:text-white shadow-sm focus:shadow will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <div class="flex flex-col">
          <fieldset
            class="flex items-center border-b border-gray-300 dark:border-gray-700 justify-between"
          >
            <RadixIconSearch class="w-6 mx-2 h-6 shrink-0" />
            <input
              type="search"
              placeholder="Search"
              class="py-2 outline-none w-full bg-transparent px-2"
            />
          </fieldset>
          <StatusPopoverCheckbox :checked="checkboxOne" msg="To do" :value="21" />
          <StatusPopoverCheckbox :checked="checkboxTwo" msg="In progress" :value="2" />
          <StatusPopoverCheckbox :checked="checkboxThree" msg="Done" :value="5" />
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
[data-radix-popper-content-wrapper] {
  z-index: 51;
}
</style>
