<script setup>
import { ref, watch, computed} from "vue"
import Header from "../components/pages/header.vue";
import SideNav from "../components/pages/lappyNav.vue";
import DashboardContent from "../components/pages/dashboardContent.vue";
import RoomsContent from "../components/pages/roomsContent.vue"
import historyContent from "../components/pages/historyContent.vue"

// Set values (as strings)
const isDashboard = ref(
    localStorage.getItem('isDashboard') !== null
        ? localStorage.getItem('isDashboard') === 'true'
        : true
);

const isRoom = ref(
    localStorage.getItem('isRoom') !== null
        ? localStorage.getItem('isRoom') === 'true'
        : false
);

const isHistory = ref(
    localStorage.getItem('isHistory') !== null
        ? localStorage.getItem('isHistory') === 'true'
        : false
);

const headerTitle = computed(() => {
  if (isDashboard.value) return 'Dashboard'
  if (isRoom.value) return 'Rooms'
  return 'History' 
})
function roomsEvent() {
    isDashboard.value = false;
    isHistory.value = false;
    isRoom.value = true;
    headerTitle.value = 'Rooms'
}


function dashboardEvent() {
    isRoom.value = false;
    isHistory.value = false;
    isDashboard.value = true;
    headerTitle.value = 'Dashboard'
}

const historyEvent = () => {
    isHistory.value = true;
    isRoom.value = false;
    isDashboard.value = false;
    headerTitle.value = 'History'
}
watch([isDashboard, isRoom, isHistory], ([newDashboard, newRoom, newHistory]) => {
    localStorage.setItem('isDashboard', newDashboard.toString());
    localStorage.setItem('isRoom', newRoom.toString());
    localStorage.setItem('isHistory', newHistory.toString());
})
</script>

<template >
    <SideNav @goToRooms="roomsEvent" @goToDashboard="dashboardEvent"  @goToHistory="historyEvent"/>
    <section class="main-content">
        <Header :headerTitle="headerTitle" />
        <DashboardContent v-if="isDashboard" />
        <RoomsContent v-if="isRoom" />
        <historyContent v-if="isHistory"/>
        <div class="curve-t">

        </div>
        <div class="curve-b">

        </div>
    </section>
</template>

<style scoped>
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: hidden;
    border: 4px solid var(--primary-color);
    border-left: none;

}

.curve-b,
.curve-t {
    position: absolute;
    height: 4rem;
    aspect-ratio: 1;
    left: 0;
}
.curve-t {
    top: 0;
    border-radius: 30px 0 0;
    box-shadow: -15px -15px 0px var(--primary-color);
}

.curve-b {
    bottom: 0;
    border-radius: 0 0 0 30px;
    box-shadow: -15px 15px 0px var(--primary-color);
}

@media screen and (max-width: 650px) {
    .curve-t,
    .curve-b {
        display: none;
    }

    .main-content {
        border: none;
    }
}
</style>