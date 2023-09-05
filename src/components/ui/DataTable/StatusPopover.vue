<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'
import { Button } from '@/components/ui/Button/Button'
import RadixIconSearch from '@/components/icons/RadixIconSearch.vue'
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'
import StatusPopoverCheckbox from './StatusPopoverCheckbox.vue'
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger :class="Button({ intent: 'default', size: 'sm' })" aria-label="Update status">
      <IconPlusCircle />
      Status
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        align="start"
        :side-offset="5"
        class="rounded border dark:border-gray-800 p-1 w-[260px] bg-white dark:bg-gray-950 dark:text-white shadow-sm focus:shadow will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <div class="flex flex-col pb-3 gap-2.5">
          <fieldset class="flex items-center justify-between">
            <RadixIconSearch class="w-6 mx-2 h-6 shrink-0"/>
            <input type="search" placeholder="Search" class="py-2 outline-none w-full bg-transparent px-2" />
          </fieldset>
          <fieldset class="flex gap-5 py-0 px-2 items-center justify-between">
            <StatusPopoverCheckbox msg="Backlog" />
            <span class="font-mono">21</span>
          </fieldset>
          <fieldset class="flex gap-5 py-0 px-2 items-center justify-between">
            <StatusPopoverCheckbox msg="Todo" />
            <span class="font-mono">2</span>
          </fieldset>
          <fieldset class="flex gap-5 py-0 px-2 items-center justify-between">
            <StatusPopoverCheckbox msg="In Progress" />
            <span class="font-mono">5</span>
          </fieldset>
          <fieldset class="flex gap-5 py-0 px-2 items-center justify-between">
            <StatusPopoverCheckbox msg="Done"/>
            <span class="font-mono">12</span>
          </fieldset>
          <fieldset class="flex gap-5 py-0 px-2 items-center justify-between">
            <StatusPopoverCheckbox msg="Canceled"/>
            <span class="font-mono">12</span>
          </fieldset>
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
