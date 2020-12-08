<template>
    <b-card no-body bg-variant="dark" text-variant="white" class="h-100">
        <b-card-body
            class="d-flex flex-column justify-content-center  text-center"
        >
            <h1 class="display-4 font-weight-bold">
                {{ targetMp || 0 }}
            </h1>
            <p class="text-info mb-0">MP required</p>
        </b-card-body>
    </b-card>
</template>

<script>
export default {
    name: 'MpRequirement',
    props: {
        targetMp: Number
    }
};
</script>

<style scoped></style>
