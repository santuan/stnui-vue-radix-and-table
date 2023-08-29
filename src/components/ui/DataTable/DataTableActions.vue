<script setup lang="ts">
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'
</script>

<template>
  <div class="flex justify-center items-center py-1">
    <PopoverRoot>
      <PopoverTrigger
        class="w-7 h-7 rounded-full ring-2 ring-white dark:ring-gray-950/50 inline-flex items-center  justify-center  focus:shadow focus:shadow-black cursor-pointer bg-gray-100 dark:bg-gray-900 hover:bg-opacity-60 outline-none"
        aria-label="Update dimensions"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path
            class="fill-gray-800 dark:fill-gray-50"
            d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm-6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"
          />
        </svg>
      </PopoverTrigger>
      <PopoverPortal to="body">
        <PopoverContent
          side="left"
          :side-offset="5"
          class="rounded z-[500] p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        >
          <div class="flex flex-col gap-2.5">
            <p class="text-mauve12 text-[15px] leading-[19px] font-semibold mb-2.5">Dimensions</p>
            <fieldset class="flex gap-5 items-center">
              <label class="text-[13px] text-grass11 w-[75px]" for="width"> Width </label>
              <input
                id="width"
                class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
                defaultValue="100%"
              />
            </fieldset>
            <fieldset class="flex gap-5 items-center">
              <label class="text-[13px] text-grass11 w-[75px]" for="maxWidth"> Max. width </label>
              <input
                id="maxWidth"
                class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
                defaultValue="300px"
              />
            </fieldset>
            <fieldset class="flex gap-5 items-center">
              <label class="text-[13px] text-grass11 w-[75px]" for="height"> Height </label>
              <input
                id="height"
                class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
                defaultValue="25px"
              />
            </fieldset>
            <fieldset class="flex gap-5 items-center">
              <label class="text-[13px] text-grass11 w-[75px]" for="maxHeight"> Max. height </label>
              <input
                id="maxHeight"
                class="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-grass11 shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none"
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
          <PopoverArrow class="fill-white" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>

<style>
[data-radix-popper-content-wrapper] {
  z-index: 9999;
}
</style>
