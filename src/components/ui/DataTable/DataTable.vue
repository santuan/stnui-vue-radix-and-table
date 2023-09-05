<script setup lang="tsx">
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  getSortedRowModel,
  createColumnHelper
} from '@tanstack/vue-table'
import { ref } from 'vue'
import { Button } from '../Button/Button'
import DataTableActions from './DataTableActions.vue'
import DataTableCheckbox from './DataTableCheckbox.vue'
import ViewPopover from './ViewPopover.vue'
import IconPlusCircle from '@/components/icons/IconPlusCircle.vue'
import IconAsc from '@/components/icons/IconAsc.vue'
import IconDesc from '@/components/icons/IconDesc.vue'
import PEOPLE from '@/data/person.json'
import slugify from '@/components/slugify'

export type Person = {
  id: number
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  createdAt: Date
  subRows?: Person[]
}

import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue
} from 'radix-vue'
import StatusPopover from './StatusPopover.vue'

const INITIAL_PAGE_INDEX = 0

const defaultData = PEOPLE

const columnHelper = createColumnHelper<Person>()
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1)
const pageSizes = [10, 20, 30, 40, 50]
const data = ref(defaultData)
const sorting = ref([])

const columns = [
  {
    id: 'checkbox',
    header: () => <DataTableCheckbox />,
    cell: () => <DataTableCheckbox />
  },
  columnHelper.accessor('id', {
    header: 'Task',
    // cell: (info) => info.getValue(),
    cell: (info) => <div class={'uppercase'}>Task - {info.getValue()}</div>,
    footer: (props) => props.column.id
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => 'Title',
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('visits', {
    header: () => 'Visits',
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        class={
          'item-' +
          slugify(info.getValue()) +
          ' dark:bg-gray-800 text-gray-100 text-xs font-mono px-2 py-1 rounded inline-flex justify-center items-baseline bg-gray-200 '
        }
      >
        {info.getValue()}
      </span>
    ),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('progress', {
    header: 'Progress',
    cell: (info) => (
      <div class={'h-2 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-full'}>
        <span
          class={'bg-gray-900 dark:bg-gray-100 h-2 block'}
          style={{ width: info.getValue() + '%' }}
        ></span>
      </div>
    ),
    footer: (props) => props.column.id
  }),
  {
    id: 'actions',
    cell: () => <DataTableActions />
  }
]

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  state: {
    get sorting() {
      return sorting.value
    }
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel()
})

function handlePageSizeChange(e) {
  table.setPageSize(Number(e.target.value))
}
</script>

<template>
  <div class="w-full text-gray-900 dark:text-gray-50">
    <div class="py-2 mb-2 flex justify-between">
      <div class="flex items-center gap-2">
        <input
          placeholder="Filter data"
          type="search"
          class="ring-1 ring-gray-500/50 h-8 rounded-md text-xs px-3 w-64 py-1.5 dark:bg-gray-950"
        />
        <div class="flex gap-2 items-center">
          <StatusPopover />
          <button :class="Button({ intent: 'outline', size: 'sm' })">
            <IconPlusCircle />
            Priority
          </button>
        </div>
      </div>
      <ViewPopover />
    </div>
    <div
      class="relative max-h-[485px] ring-1 ring-gray-600/50 rounded-md overflow-hidden min-h-[485px] overflow-x-auto overflow-y-auto w-full"
    >
      <table class="w-full">
        <thead
          class="sticky top-0 bg-white dark:bg-gray-700 dark:shadow-gray-900 shadow-sm shadow-gray-300"
        >
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              class="group"
              :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <template v-if="!header.isPlaceholder">
                <button
                  class="relative flex items-center justify-between outline-none focus-visible:border px-1 border-gray-400 dark:border-gray-300 w-full border-dashed"
                >
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                  <div>
                    <span v-if="header.column.getIsSorted() === 'asc'" class="">
                      <IconAsc />
                    </span>
                    <span v-if="header.column.getIsSorted() === 'desc'" class="">
                      <IconDesc />
                    </span>
                  </div>
                </button>
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in table.getRowModel().rows" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between w-full gap-3 p-2 px-0">
      <div class="flex items-center gap-1">
        <span>Page</span>
        <strong>
          {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </strong>
      </div>

      <div class="flex items-center justify-end gap-2">
        <!-- <DataTableSelect
          :pageSizes="pageSizes"
          :paginationPageSize="table.getState().pagination.pageSize"
        /> -->
        <div class="flex gap-2 items-center">
          <span>Rows per page (Native Select)</span>
          <select
            class="dark:bg-gray-900 py-1 h-8 outline-none ring-2 ring-transparent duration-300 dark:ring-gray-700 focus-visible:ring-white !px-2 rounded-sm dark:text-gray-300 border dark:border-gray-700"
            :value="table.getState().pagination.pageSize"
            @change="handlePageSizeChange"
          >
            <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">
              {{ pageSize }}
            </option>
          </select>
        </div>
        <div class="flex justify-end items-center gap-2">
          <span>Rows per page (Radix Select)</span>
          <SelectRoot :value="table.getState().pagination.pageSize" @change="handlePageSizeChange">
            <SelectTrigger
              className="inline-flex w-16 items-center justify-between rounded px-2 text-sm h-8 gap-1 bg-white text-gray-900 shadow shadow-black/10 hover:bg-gray-100 focus:shadow-sm dark:bg-gray-900 dark:text-white hover:dark:text-gray-100 outline-none ring-2 ring-transparent duration-300 dark:ring-gray-700 focus-visible:ring-white hover:dark:bg-gray-950 focus:shadow-black data-[placeholder]:text-gray-500"
            >
              <SelectValue :placeholder="table.getState().pagination.pageSize" />
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 15 15"
              >
                <path
                  class="dark:fill-gray-100 fill-gray-900"
                  fill-rule="evenodd"
                  d="M4.932 5.432a.45.45 0 1 0 .636.636L7.5 4.136l1.932 1.932a.45.45 0 0 0 .636-.636l-2.25-2.25a.45.45 0 0 0-.636 0l-2.25 2.25Zm5.136 4.136a.45.45 0 0 0-.636-.636L7.5 10.864L5.568 8.932a.45.45 0 0 0-.636.636l2.25 2.25a.45.45 0 0 0 .636 0l2.25-2.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                :side-offset="5"
                position="popper"
                side="top"
                align="start"
                class="w-24 bg-white ring-1 ring-gray-600 dark:bg-gray-950 dark:text-white rounded shadow will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              >
                <SelectItem
                  v-for="pageSize in pageSizes"
                  :key="pageSize"
                  :value="pageSize"
                  class="text-sm leading-none focus-visible:bg-gray-100 focus-visible:dark:bg-gray-800 focus-visible:dark:ring-transparent focus-visible:ring-2 hover:ring-2 dark:ring-gray-500/50 text-grass11 rounded flex items-center py-2 pr-6 pl-3 relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                >
                  {{ pageSize }}
                  <SelectItemIndicator
                    class="absolute right-0 w-[25px] inline-flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
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
                  </SelectItemIndicator>
                </SelectItem>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>

        <div class="flex gap-2 items-center justify-end">
          <button
            :class="Button({ intent: 'default', size: 'sm' })"
            @click="() => table.setPageIndex(0)"
            :disabled="!table.getCanPreviousPage()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z" />
              <path fill="#ffffff" d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z" />
            </svg>
          </button>
          <button
            :class="Button({ intent: 'default', size: 'sm' })"
            @click="() => table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.41z" />
            </svg>
          </button>
          <button
            :class="Button({ intent: 'default', size: 'sm' })"
            @click="() => table.nextPage()"
            :disabled="!table.getCanNextPage()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z" />
            </svg>
          </button>
          <button
            :class="Button({ intent: 'default', size: 'sm' })"
            @click="() => table.setPageIndex(table.getPageCount() - 1)"
            :disabled="!table.getCanNextPage()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M6.41 6L5 7.41L9.58 12L5 16.59L6.41 18l6-6z" />
              <path fill="#ffffff" d="m13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- <pre>{{ JSON.stringify(table.getState().pagination, null, 2) }}</pre> -->
    <!-- <div>{{ table.getRowModel().rows.length }} Rows</div> -->
  </div>
</template>

<style>
table {
  @apply table-auto lg:table-fixed;
}

thead {
  @apply z-50 -translate-y-0.5;
}

tbody {
  @apply border-b border-gray-300 dark:border-gray-700;
}

th {
  @apply border-b border-t bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-left py-1 px-3;
  @apply hover:bg-gray-100 hover:dark:bg-gray-900;
}
td {
  @apply border-b  border-gray-300 dark:border-gray-700 py-1.5 px-3;
}

tfoot {
  @apply text-gray-100 dark:text-gray-600;
}

tfoot th {
  font-weight: normal;
}

/* Rows  */

tr:nth-child(even) {
  @apply !bg-gray-50 dark:!bg-gray-900;
  @apply hover:!bg-gray-100 hover:dark:!bg-gray-950/30;
}

tr:nth-child(odd) {
  @apply !bg-gray-100/30 dark:!bg-gray-950/30;
  @apply hover:!bg-gray-100/60 hover:dark:!bg-gray-950/60;
}

/* Columns */

thead th:nth-child(1) button {
  @apply justify-center items-center;
}

thead th:nth-child(1),
tbody td:nth-child(1) {
  @apply w-3 lg:px-0 pl-2 text-center;
  max-width: 20px;
}

thead th:nth-child(2),
tbody td:nth-child(2) {
  @apply w-16 shrink-0 lg:min-w-[3rem] lg:max-w-[3rem] lg:pl-0 text-left;
}

thead th:nth-child(3),
tbody td:nth-child(3) {
  @apply w-64 lg:w-24 text-left;
}

thead th:nth-child(4),
tbody td:nth-child(4) {
  @apply w-32 lg:w-16 lg:min-w-[3rem] lg:max-w-[3rem] text-left;
}

thead th:nth-child(5),
tbody td:nth-child(5) {
  @apply w-32 lg:w-20 lg:min-w-[3rem] lg:max-w-[3rem] text-left;
}

thead th:nth-child(6),
tbody td:nth-child(6) {
  @apply w-32 lg:w-24 lg:min-w-[5rem] lg:max-w-[5rem] text-left;
}

thead th:nth-child(7),
tbody td:nth-child(7) {
  @apply w-32 lg:w-12 lg:min-w-[5rem] lg:max-w-[5rem] text-left;
}

thead th:nth-child(8),
tbody td:nth-child(8) {
  @apply w-6 pr-0 text-center;
}

.item-to-do {
  @apply bg-gray-600;
}

.item-in-progress {
  @apply bg-orange-600;
}

.item-done {
  @apply bg-emerald-600;
}
</style>
