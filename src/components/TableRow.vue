<template>
    <tr v-if="firstData!='id' && firstData!='name' && firstData!='poster' && firstData!='genres'">
        <td>{{ firstData.toUpperCase() }}</td>
        <td>{{ secondData }}</td>
    </tr>
</template>

<script>
export default {
    props: {
        firstData: String,
        secondData: String,
    }
}
</script>

<style scoped>
td{
    text-wrap: wrap;
}

tr td:nth-child(1) {
    font-weight: bold
}
</style>