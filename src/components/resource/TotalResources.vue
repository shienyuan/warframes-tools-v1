<template>
    <b-card bg-variant="dark" :no-body="!isGrid">
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                Total Resources
                <div v-if="selectedItems.length > 0">
                    <b-icon
                        icon="grid"
                        class="mr-2"
                        :class="isGrid ? 'text-white' : 'text-white-50'"
                        @click="isGrid = true"
                    />
                    <b-icon
                        :class="!isGrid ? 'text-white' : 'text-white-50'"
                        icon="card-list"
                        @click="isGrid = false"
                    />
                </div>
            </div>
        </template>

        <div class="resources">
            <p v-if="selectedItems.length <= 0" class="text-white-50 m-0">
                Please select one or multiple items to get started
            </p>

            <b-row v-if="isGrid">
                <b-col
                    v-for="(c, i) in getComponents"
                    :key="i"
                    cols="5"
                    sm="4"
                    md="3"
                >
                    <b-card
                        no-body
                        bg-variant="secondary"
                        class="mb-3 d-flex flex-column justify-content-center align-items-center py-2 px-1"
                    >
                        <b-img
                            :src="getImgUrl + c.imageName"
                            style="width: 50px"
                            class="mb-1"
                        />
                        <p class="small mb-1 text-center">
                            {{ c.name }}
                        </p>
                        <p class="m-0">{{ c.itemCount }}</p>
                    </b-card>
                </b-col>
            </b-row>

            <b-list-group v-if="!isGrid">
                <b-list-group-item
                    v-for="(c, i) in getComponents"
                    :key="i"
                    class="d-flex justify-content-between align-items-center bg-secondary"
                >
                    <div>
                        <b-img
                            :src="getImgUrl + c.imageName"
                            style="width: 50px"
                            class="mb-1 mr-3"
                        />
                        <p class="m-0 d-inline-block">
                            {{ c.name }}
                        </p>
                    </div>

                    <p class="m-0 d-inline-block">
                        {{ c.itemCount }}
                    </p>
                </b-list-group-item>
            </b-list-group>
        </div>
    </b-card>
</template>

<script>
export default {
    name: 'TotalResources',
    props: {
        selectedItems: Array,
    },
    data() {
        return {
            isGrid: true,
        };
    },
    computed: {
        getImgUrl() {
            return `https://cdn.warframestat.us/img/`;
        },
        getComponents() {
            const components = {};

            this.selectedItems.forEach((s) => {
                s.components.forEach((c) => {
                    if (c.name !== 'Blueprint') {
                        if (!components[c.name]) {
                            components[c.name] = {
                                name: c.name,
                                imageName: c.imageName,
                                itemCount: c.itemCount,
                            };
                        } else {
                            components[c.name].itemCount++;
                        }
                    }
                });
            });

            return components;
        },
    },
};
</script>

<style scoped>
.resources {
    height: 60vh;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
