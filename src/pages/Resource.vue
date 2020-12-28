<template>
    <Layout>
        <template v-slot:header> Resources Calculator</template>

        <b-row>
            <b-col lg="4">
                <b-form-input
                    size="lg"
                    class="mb-3 bg-secondary"
                    placeholder="Search item"
                    v-model="search"
                />

                <b-card
                    bg-variant="secondary"
                    no-body
                    class="mb-3 items overflow-auto"
                >
                    <b-list-group flush>
                        <b-list-group-item
                            class="bg-dark"
                            v-for="p in filteredItems"
                            :key="p.id"
                            @click="handleItemSelect(p.node)"
                        >
                            <div class="d-flex align-items-center">
                                <b-img-lazy
                                    class="mr-4"
                                    style="width: 50px"
                                    :src="getImgUrl + p.node.imageName"
                                    :alt="`warframe-primary-weapon-${p.node.name}`"
                                />
                                <div
                                    class="d-flex justify-content-between align-items-center w-100"
                                >
                                    <span
                                        :class="
                                            selectedItems.includes(p.node)
                                                ? 'text-primary'
                                                : ''
                                        "
                                        >{{ p.node.name }}</span
                                    >
                                    <b-icon
                                        class="h5"
                                        :class="
                                            selectedItems.includes(p.node)
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
            </b-col>

            <b-col lg="8">
                <b-card
                    header="Total Resources"
                    bg-variant="dark"
                    class="mb-3 resources overflow-auto"
                >
                    <p
                        class="text-white-50 small"
                        v-if="selectedItems.length === 0"
                    >
                        Please select an item
                    </p>
                    <b-list-group class="overflow-auto">
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
                </b-card>

                <b-card header="Selected Items" bg-variant="dark">
                    <p
                        class="text-white-50 small"
                        v-if="selectedItems.length > 0"
                    >
                        Click on item to remove
                    </p>
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
                                @click="removeSelectedItem(i)"
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
                </b-card>
            </b-col>
        </b-row>
    </Layout>
</template>

<page-query>
query {
primary: allPrimary(sortBy:"name" order:ASC){
edges{
node {
id
name
imageName
components{
name
itemCount
imageName
}
}
}
}
}
</page-query>

<script>
export default {
    name: 'Resource',
    data() {
        return {
            search: '',
            selectedItems: [],
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
        filteredItems() {
            return this.$page.primary.edges.filter((s) =>
                s.node.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        handleItemSelect(item) {
            const itemIndex = this.selectedItems.indexOf(item);

            if (itemIndex < 0) {
                this.selectedItems.push(item);
            } else {
                this.removeSelectedItem(itemIndex);
            }
        },
        removeSelectedItem(i) {
            this.selectedItems.splice(i, 1);
        },
    },
};
</script>

<style scoped>
.resources {
    height: 60vh;
}

.items {
    height: 100vh;
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #535353;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #a9a9a9;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #cfcfcf;
}
</style>
