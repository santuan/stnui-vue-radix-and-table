<script setup lang="ts">
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'
import { Button } from '@/components/ui/Button/Button';
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger
      :class="Button({ intent: 'default', size: 'sm' })"
      aria-label="Update status"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15">
        <path
          class="fill-white"
          fill-rule="evenodd"
          d="M5.5 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3ZM3 5c.017 0 .033 0 .05-.002a2.5 2.5 0 0 0 4.9 0A.507.507 0 0 0 8 5h5.5a.5.5 0 0 0 0-1H8c-.017 0-.033 0-.05.002a2.5 2.5 0 0 0-4.9 0A.507.507 0 0 0 3 4H1.5a.5.5 0 0 0 0 1H3Zm8.95 5.998a2.5 2.5 0 0 1-4.9 0A.507.507 0 0 1 7 11H1.5a.5.5 0 0 1 0-1H7c.017 0 .033 0 .05.002a2.5 2.5 0 0 1 4.9 0A.506.506 0 0 1 12 10h1.5a.5.5 0 0 1 0 1H12c-.017 0-.033 0-.05-.002ZM8 10.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"
          clip-rule="evenodd"
        />
      </svg>
      View
    </PopoverTrigger>
    <PopoverPortal class="z-[900]">
      <PopoverContent
        side="bottom"
        align="end"
        :side-offset="5"
        class="rounded p-5 w-[260px]  bg-white dark:bg-gray-950 dark:text-white shadow-sm focus:shadow will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <div class="flex flex-col gap-2.5">
          <p class="text-mauve12 text-[15px] leading-[19px] font-semibold mb-2.5">Dimensions</p>
          <fieldset class="flex gap-5 items-center">
            <label class="text-[13px] text-grass11 w-[75px]" for="width"> Width </label>
            <input
              id="width"
              class="w-full inline-flex items-center dark:text-gray-100 dark:bg-gray-900 justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
              defaultValue="100%"
            />
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label class="text-[13px] text-grass11 w-[75px]" for="maxWidth"> Max. width </label>
            <input
              id="maxWidth"
              class="w-full inline-flex items-center dark:text-gray-100 dark:bg-gray-900 justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
              defaultValue="300px"
            />
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label class="text-[13px] text-grass11 w-[75px]" for="height"> Height </label>
            <input
              id="height"
              class="w-full inline-flex items-center dark:text-gray-100 dark:bg-gray-900 justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
              defaultValue="25px"
            />
          </fieldset>
          <fieldset class="flex gap-5 items-center">
            <label class="text-[13px] text-grass11 w-[75px]" for="maxHeight"> Max. height </label>
            <input
              id="maxHeight"
              class="w-full inline-flex items-center dark:text-gray-100 dark:bg-gray-900 justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
              defaultValue="none"
            />
          </fieldset>
        </div>
        <PopoverClose
          class="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-grass11 absolute top-[5px] right-[5px] hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15">
            <path
              fill="#888888"
              fill-rule="evenodd"
              d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z"
              clip-rule="evenodd"
            />
          </svg>
        </PopoverClose>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>

[data-radix-popper-content-wrapper] {
  z-index: 51;
}
</style>