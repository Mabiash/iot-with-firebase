<script setup>
import { ref } from 'vue'
import { roomsData } from "../../stores/roomsData"
const rooms = roomsData()
const historyData = rooms.historyData.sort((a, b) => new Date(b.date) - new Date(a.date));

console.log(historyData);
</script>

<template>
    <section>
        <div class="filter-history-container">
            <div class="filter-method">
                <select name="" id="">
                    <option value="All">All</option>
                    <div v-for="item in historyData">
                        <option :value="item.roomName">{{ item.roomName }}</option>
                    </div>
                </select>
            </div>
            <div class="filter-date">
                <select name="" id="">
                    <option :value="new Date().toLocaleDateString()">{{ new Date().toLocaleDateString() }}</option>
                </select>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Room Name</th>
                        <th>Responsible</th>
                        <th>Student ID</th>
                        <th>Section</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="room in historyData">
                        <td>{{ room.roomName }}</td>
                        <td>{{ room.responsible }}</td>
                        <td>{{ room.stdId }}</td>
                        <td>{{ room.section }}</td>
                        <td>{{ room.date }}</td>
                        <td>{{ room.action }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0px 2.5rem;
    gap: 5px;
}


.filter-history-container {
    width: fit-content;
    height: fit-content;
    display: flex;
    gap: 5px;
    padding: 0px 5px;

}

.filter-method,
.filter-date {
    background:  rgb(15, 126, 89);
    padding: 0px 5px 0 0;
    border-radius: 5px;

}

option {
    background-color: #fff !important;
    color: black;


}
select {
    padding: 10px 1.7rem;
    background-color: transparent;
    color: white;
    border: 0;
    outline: 0;
    cursor: pointer;
}

.table-container {
    height: fit-content;
    background: var(--third-color);
    border-radius: 10px;
    overflow: auto;
    scrollbar-width: thin;
    max-height: 70vh;
  
}

table {
    width: 100%;
    min-width: 50rem;
    padding: 10px;

}

thead {
    font-size: 14px;
    border: 1px solid black;
    text-align: justify;
}

thead tr {
    background-color: rgba(0, 0, 0, 0.555);
}

tbody {
    text-align: justify;
}

th {
    color: rgb(255, 255, 255);
}

td {
    color: rgb(230, 230, 230);
    font-size: clamp(12.78px, 2vw, 14px);
    width: fit-content;
}

tr:not(thead tr):hover {
    background-color: rgba(0, 0, 0, 0.356);
    cursor: pointer;
}

td,
th {
    padding: 10px 10px;
    cursor: pointer;
}

td:not(:last-child),
th:not(:last-child) {

    border-right: 1px solid white;
}

td {}


@media screen and (max-width: 520px) {

    section {
        padding: 10px;
    }
    .table-container {
        min-height: 0;
        height: fit-content;
        overflow-x: auto;
        max-width: 100vw !important;
    }

}
</style>