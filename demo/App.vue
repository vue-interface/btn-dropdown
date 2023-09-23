<script setup lang="ts">
import { BtnDropdown } from '../index.js';

</script>

<template>
    <div class="container max-w-screen-lg mx-auto pb-12">
        <BtnDropdown variant="btn-primary" label="Regular Button">
            <a href="#/test" class="dropdown-item">Action</a>
            <a href="#" class="dropdown-item">Another Action</a>
            <a href="#" class="dropdown-item">Something else here</a>
        </BtnDropdown>
    </div>
</template>