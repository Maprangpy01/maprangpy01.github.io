<template lang="">
    <div class="my-profile">
        <p>My name is {{ name }}</p>
        <p>I'm {{ age }} yearold</p>
        <p>My position is {{ position }}</p>
        <p>My favourite programming language is</p>
        <p v-for="lang in lang">{{ lang }}</p>
        <button @click="count++">Click Me {{ count }}</button>
        <button @click="name='Maprang'">Change my name</button>
        <button @click="awesome = !awesome">Toggle</button>
        <p v-if="awesome">Vue is awesome</p>
        <p v-else>Oh no!</p>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name: "Boonsita Puangart",
            age: "23",
            position: "frontend Developer",
            lang: ["Javascript","React","HTML","CSS"],
            count:0,
            awesome:true,
        }
    }
}
</script>
<style scoped>
    .my-profile{
        background: yellow;
        color:black;
        padding:5px;
    }
</style>