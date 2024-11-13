<script setup lang="ts">
import { useDateFns } from "~/composables/useDateFns";

const config = useRuntimeConfig();
const route = useRoute();
const { id } = route.params;

const { data, error } = await useAsyncData("mountains", () =>
  $fetch(`${config.public.API_URL}/requests/frame/${id}`)
);

const res: any = data.value;
const { data: request = {} } = res;
</script>

<template>
  <main class="p-4">
    <section v-if="error">
      <h1 class="text-3xl font-bold">Error</h1>
      <p>Ops. An eerror occoured while fetching request details</p>
      {{ error }}
    </section>
    <section v-else>
      <h1 class="text-2xl font-bold text-center mt-4 mb-6">Custom Art Request Details</h1>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        <img
          :src="request.fileURL"
          :alt="request.name"
          class="col-span-5 w-full rounded-md"
        />
        <div class="col-span-7">
          <h3 class="text-2xl"><strong>Name:</strong> {{ request.name }}</h3>
          <p class="text-xl">
            <strong>Phone:</strong>
            <a
              :href="`tel:${request.phone}`"
              class="text-green-600 underline ml-1 font-medium"
              >{{ request.phone }}</a
            >
          </p>
          <p class="text-xl">
            <strong>Email:</strong>
            <a
              :href="`mailto:${request.email}`"
              class="text-green-600 underline ml-1 font-medium"
              >{{ request.email }}</a
            >
          </p>
          <p class="text-xl">
            <strong>Date:</strong>
            {{ useDateFns(request.created_at, "do MMM, yyyy. hh:mm aaaa") }}
          </p>
          <div class="mt-4 text-xl">
            <p class="flex font-bold">
              Frame Details:
              <i class="flex items-center ml-1 font-normal">
                {{ request.canvasType }} | {{ request.canvasResolution }}
              </i>
            </p>
            <p class="flex items-center">
              <strong class="mr-1">Size: </strong> {{ request.size?.name }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
