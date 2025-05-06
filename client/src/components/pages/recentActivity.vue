<script setup>
import { ref } from 'vue'

const rooms = ref([
    {
        roomName: "BIST 2F111111",
        reponsible: "Kieth Mendizabal",
        date: new Date(),
        action: "Open",
        stdId: "MMC2023-00457",
        section: "BSIT 2F3"
    },
    {
        roomName: "BIST 2F111111",
        reponsible: "Kieth Mendizabal",
        date: new Date(),
        action: "Open",
        stdId: "MMC2023-00457",
        section: "BSIT 2F3"
    },
     {
        roomName: "BIST 2F111111",
        reponsible: "Kieth Mendizabal",
        date: new Date(),
        action: "Open",
        stdId: "MMC2023-00457",
        section: "BSIT 2F3"
    },
    {
        roomName: "BIST 2F111111",
        reponsible: "Kieth Mendizabal",
        date: new Date(),
        action: "Open",
        stdId: "MMC2023-00457",
        section: "BSIT 2F3"
    },
    
])

</script>

<template>
    <h4>Recent Activity</h4>
    <section class="table-container">
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
                <tr v-for="room in rooms">
                    <td>{{room.roomName}}</td>
                    <td>{{room.reponsible}}</td>
                    <td>{{room.stdId}}</td>
                    <td>{{room.section}}</td>
                    <td>{{ room.date.toLocaleString() }}</td>
                    <td>{{room.action}}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>

h4{
    padding: 0px 10px;
    margin-bottom: 10px;
    position: sticky;
    left: 0;
    font-size: clamp(16px, 3vw, 20px);
}
.table-container {
    width: 100%;    
    height: 100%;
    background: var(--third-color);
    padding: 10px;
    border-radius: 10px;
    overflow: auto;
    scrollbar-width: thin;
    min-width: 55rem;
    min-height: 28.8rem;
    max-height: 28.8rem;
}

table {
    width: 100%;
}

thead {
    font-size: 14px;
    border: 1px solid black;
    text-align: justify;
}

thead tr{
    background-color: rgba(0, 0, 0, 0.555);
}

tbody {
    text-align: justify;
}

th{
    color: rgb(255, 255, 255);
}

td {
    color: rgb(230, 230, 230);
    font-size: clamp(12px, 2vw, 14px);
    width: fit-content;
}

tr:not(thead tr):hover{
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


@media screen and (max-width: 994px) {
    .table-container{
        min-height: 0 ;
        height: fit-content;
    }
}
</style>
