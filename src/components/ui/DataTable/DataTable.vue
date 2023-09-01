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

export type Person = {
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
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue
} from 'radix-vue'

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
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => 'Last Name',
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
    footer: (props) => props.column.id
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
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
          <button :class="Button({ intent: 'default', size: 'sm' })">
            <IconPlusCircle />
            Status
          </button>
          <button :class="Button({ intent: 'default', size: 'sm' })">
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
                <div class="relative flex items-center justify-between">
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
                </div>
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

      <div class="flex items-center justify-end gap-5">
        <!-- <DataTableSelect
          :pageSizes="pageSizes"
          :paginationPageSize="table.getState().pagination.pageSize"
        /> -->
        <select
          class="dark:bg-gray-900 py-2 !px-6 rounded-sm dark:text-gray-300 border dark:border-gray-600"
          :value="table.getState().pagination.pageSize"
          @change="handlePageSizeChange"
        >
          <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">
            Show {{ pageSize }}
          </option>
        </select>
        <div class="flex justify-end items-center gap-2">
          <span>Rows per page</span>
          <SelectRoot :value="table.getState().pagination.pageSize" @change="handlePageSizeChange">
            <SelectTrigger
              className="inline-flex w-16 items-center justify-between ring-1 ring-gray-500/50 rounded px-3 text-sm leading-none h-8 gap-[5px] bg-white text-gray-900 shadow shadow-black/10 hover:bg-gray-100 focus:shadow-sm dark:bg-gray-900 dark:text-white hover:dark:text-gray-100 hover:dark:bg-gray-950 focus:shadow-black data-[placeholder]:text-green9 outline-none"
            >
              <SelectValue :placeholder="table.getState().pagination.pageSize" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                width="32"
                height="32"
                viewBox="0 0 15 15"
              >
                <path
                  class="fill-gray-900 dark:fill-white"
                  fill-rule="evenodd"
                  d="M3.135 6.158a.5.5 0 0 1 .707-.023L7.5 9.565l3.658-3.43a.5.5 0 0 1 .684.73l-4 3.75a.5.5 0 0 1-.684 0l-4-3.75a.5.5 0 0 1-.023-.707Z"
                  clip-rule="evenodd"
                />
              </svg>
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                :side-offset="5"
                position="popper"
                side="top"
                class="w-16 bg-white dark:bg-gray-950 dark:text-white rounded shadow will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              >
                <SelectItem
                  v-for="pageSize in pageSizes"
                  :key="pageSize"
                  :value="pageSize"
                  class="text-sm leading-none hover:ring-2 dark:ring-gray-500/50 text-grass11 rounded flex items-center h-12 pr-6 pl-6 relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                >
                  {{ pageSize }}
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
/* table {} */

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
  @apply border-b  border-gray-300 dark:border-gray-700 py-1 px-3;
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

thead th:nth-child(1) div {
  @apply justify-center items-center;
}

thead th:nth-child(1),
tbody td:nth-child(1) {
  @apply w-6 text-center;
  max-width: 20px;
}

thead th:nth-child(2),
tbody td:nth-child(2) {
  @apply w-64 text-left;
}

thead th:nth-child(3),
tbody td:nth-child(3) {
  @apply w-64 lg:w-20 text-left;
}

thead th:nth-child(4),
tbody td:nth-child(4) {
  @apply w-32 lg:w-16 text-left;
}

thead th:nth-child(5),
tbody td:nth-child(5) {
  @apply w-32 lg:w-20 text-left;
}

thead th:nth-child(6),
tbody td:nth-child(6) {
  @apply w-32 lg:w-24 text-left;
}

thead th:nth-child(7),
tbody td:nth-child(7) {
  @apply w-32 lg:w-24 text-left;
}
thead th:nth-child(8),
tbody td:nth-child(8) {
  @apply w-12 lg:w-12 text-center;
}
</style>
