<template>
    <b-card header="Selected Items" bg-variant="dark">
        <div class="items">
            <b-row>
                <b-col
                    v-for="(s, i) in selectedItems"
                    :key="s.id"
                    cols="4"
                    sm="3"
                    md="2"
                >
                    <b-card
                        no-body
                        bg-variant="secondary"
                        class="mb-3 d-flex flex-column justify-content-center align-items-center py-2 px-1"
                        style="cursor: pointer"
                        @click="$emit('onItemRemoved', i)"
                    >
                        <b-img
                            :src="getImgUrl + s.imageName"
                            style="width: 50px"
                            class="mb-1"
                        />
                        <p class="small m-0">
                            {{ s.name }}
                        </p>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </b-card>
</template>

<script>
export default {
    name: 'SelectedItems',
    props: {
        selectedItems: Array,
    },
    computed: {
        getImgUrl() {
            return `https://cdn.warframestat.us/img/`;
        },
    },
};
</script>

<style scoped>
.items {
    height: 30vh;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
