<script setup>
import {defineProps} from "vue"

const props = defineProps({
    headerTitle: String
});

</script>

<template>
    <header class="header">
        <h1 class="label">{{props.headerTitle}}</h1>
        <div class="ipt-con">
            <!-- <div class="ipt">
                <input type="text" placeholder="Search rooms..." class="search-room">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div> -->

            <div class="profile-container">

            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    width: 100%;
    height: auto;
    padding: 1.5rem 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}.label {
    color: var(--primary-color);
    font-size: clamp(20px, 3vw, 26px);
}
.ipt-con {
    width: fit-content;
    height: 2.3rem;
    display: flex;
    position: relative;
    align-items: center;  
    gap: 10px;
}

.ipt {
    flex: 1;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
}

.ipt i {
    position: absolute;
    right: 10px;
    color: oklch(26.2% 0.051 172.552);
    cursor: pointer;
}
.search-room {
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    font-size: 12px;
    padding: 6px 12px;
    width: 100%;
    height: 100%;
}

.profile-container {
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50rem;
    background-color: rgb(0, 0, 0);
    border: 2px solid var(--primary-color);
}

@media screen and (max-width: 650px) {
    .header {
        padding: 10px;
    }
}
</style>