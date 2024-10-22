<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

interface MenuItem {
  label: string;
  type: "link" | "dropdown";
  items?: { label: string; href: string }[];
}

interface Props {
  menuList: MenuItem[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "navigate", item: any, event: MouseEvent): void;
}>();

const router = useRouter(); // 获取当前的 router 实例

function handleNavigation(item: any, event: MouseEvent) {
  // event.preventDefault(); // 阻止默认行为
  router.push(item.href);
  console.log(item, event);
  // emit("navigate", item, event);
}
</script>

<template>
  <a className="btn btn-ghost text-xl">ASList</a>
  <div class="hidden navbar-center lg:flex">
    <ul className="menu menu-horizontal px-1 z-8">
      <li v-for="(item, index) in props.menuList" :key="index">
        <template v-if="item.type === 'link'">
          <a @click="handleNavigation(item, $event)">
            {{ item.label }}
          </a>
        </template>
        <template v-else-if="item.type === 'dropdown'">
          <details>
            <summary>{{ item.label }}</summary>
            <ul class="p-2">
              <li v-for="(subItem, subIndex) in item.items" :key="subIndex">
                <a @click="handleNavigation(subItem, $event)">
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
