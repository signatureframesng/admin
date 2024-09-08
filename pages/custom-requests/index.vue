<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const { data, status, error, refresh, clear } = await useAsyncData("mountains", () =>
  $fetch(`${config.public.API_URL}/requests/frames`)
);

const res: any = data.value;
const { data: requests = [] } = res;
</script>

<template>
  <main class="p-4">
    <section v-if="error">
      <h1 class="text-3xl font-bold">Error</h1>
      <p>Oops. An eerror occoured while fetching request details</p>
      <p>{{ error }}</p>
    </section>
    <section v-else>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Custom Art Requests</h1>
        <img
          src="https://res.cloudinary.com/signatureframes/image/upload/site-assets/icon/icon.svg"
          alt="signature frames logo"
          class="w-12"
        />
      </div>
      <div class="grid lg:grid-cols-2 gap-4 mt-4 px-5">
        <nuxt-link
          v-for="request in requests"
          :key="request.id"
          :to="`/custom-requests/${request.id}`"
          class="flex items-center gap-4 border rounded-md p-4"
        >
          <img :src="request.fileURL" :alt="request.name" class="w-36 rounded-md" />
          <div class="">
            <h3 class="text-xl"><strong>Name:</strong> {{ request.name }}</h3>
            <i class="flex items-center">
              {{ request.canvasType }} | {{ request.canvasResolution }}
            </i>
            <p class="flex items-center">
              <strong class="mr-1">Phone: </strong> {{ request.phone }}
            </p>
            <p class="flex items-center">
              <strong class="mr-1">Size: </strong> {{ request.size?.name }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
