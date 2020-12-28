<template>
    <b-col cols="4" sm="3" md="2" @click="$emit('onWarframeClick')">
        <div
            class="d-flex align-items-end mb-3 bg-dark rounded-lg"
            style="height: 150px; background-size: cover; background-position: top"
            :style="
                `background-image: url('${getImgUrl}/${data.img}?tr=h-300')`
            "
        >
            <div
                class="bg-info w-100 py-1 text-white rounded-bottom text-center"
            >
                {{ data.name }}
            </div>
        </div>
    </b-col>
</template>

<script>
export default {
    name: 'warframe-list',
    props: {
        data: Object
    },
    computed: {
        getImgUrl() {
            return `${process.env.GRIDSOME_IMG_URL}/warframes/`;
        }
    }
};
</script>

<style scoped></style>
