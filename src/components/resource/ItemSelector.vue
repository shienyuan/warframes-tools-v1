<template>
    <aside>
        <b-form-input
            size="lg"
            class="bg-secondary"
            placeholder="Search item"
            v-model="search"
        />

        <div class="my-2 d-flex justify-content-between align-items-center">
            <span class="text-right small text-white-50">
                Selected items: {{ selectedItems.length }}
            </span>
            <b-button size="sm" variant="dark" @click="$emit('onDeselectAll')"
                >Deselect all</b-button
            >
        </div>

        <b-card bg-variant="secondary" no-body class="mb-3">
            <b-list-group flush class="selector overflow-auto">
                <b-list-group-item
                    style="cursor: pointer"
                    class="bg-dark text-white-50"
                    v-for="item in filteredItems"
                    :key="item.id"
                    action
                    @click="$emit('onItemSelected', item.node)"
                >
                    <div class="d-flex align-items-center">
                        <b-img-lazy
                            class="mr-4"
                            style="width: 50px"
                            :src="getImgUrl + item.node.imageName"
                            :alt="`warframe-primary-weapon-${item.node.name}`"
                        />
                        <div
                            class="d-flex justify-content-between align-items-center w-100"
                        >
                            <span
                                :class="
                                    selectedItems.includes(item.node)
                                        ? 'text-primary'
                                        : ''
                                "
                                >{{ item.node.name }}</span
                            >
                            <b-icon
                                class="h5 mb-0"
                                :class="
                                    selectedItems.includes(item.node)
                                        ? 'text-primary'
                                        : ''
                                "
                                icon="arrow-right-circle-fill"
                            ></b-icon>
                        </div>
                    </div>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </aside>
</template>

<script>
export default {
    name: 'ItemSelector',
    props: {
        primaryData: Array,
        secondaryData: Array,
        meleeData: Array,
        selectedItems: Array,
    },
    data() {
        return {
            search: '',
        };
    },
    computed: {
        getImgUrl() {
            return `https://cdn.warframestat.us/img/`;
        },
        filteredItems() {
            return [
                ...this.primaryData,
                ...this.secondaryData,
                ...this.meleeData,
            ].filter((s) =>
                s.node.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    methods: {},
};
</script>

<style scoped>
.selector {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
