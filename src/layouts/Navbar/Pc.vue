<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

interface MenuItem {
  label: string;
  type: "link" | "dropdown";
  items?: { label: string; href: string }[];
}

interface Props {
  menuList: MenuItem[];
  // goRouter: (item: any, event: MouseEvent) => void;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "navigate", item: any, event: MouseEvent): void;
}>();

function handleNavigation(item: any, event: MouseEvent) {
  emit("navigate", item, event);
}

function goRouter(item: any, event: MouseEvent) {
  props.goRouter(item, event);
}
</script>

<template>
  <a className="btn btn-ghost text-xl">daisyUI</a>
  <div class="hidden navbar-center lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li v-for="(item, index) in props.menuList" :key="index">
        <template v-if="item.type === 'link'">
          <a>{{ item.label }}</a>
        </template>
        <template v-else-if="item.type === 'dropdown'">
          <details>
            <summary>{{ item.label }}</summary>
            <ul class="p-2">
              <li v-for="(subItem, subIndex) in item.items" :key="subIndex">
                <a @click="handleNavigation(subItem)">
                  {{ subItem.label }}
                </a>
              </li>
            </ul>
          </details>
        </template>
      </li>
    </ul>
  </div>
</template>
