<template>
    <b-card no-body :header="name">
        <b-list-group flush>
            <b-list-group-item class="text-center">
                <b-img height="100" :src="img" :alt="`warframe-${name}`" />
            </b-list-group-item>

            <b-list-group-item>
                <b-row>
                    <b-col cols="5">
                        <span>Blueprint</span>
                    </b-col>
                    <b-col cols="7" class="text-right">
                        <div v-for="(b, i) in blueprint" :key="i">
                            <b-link target="_blank" :href="b.link"
                                >{{ b.name }}
                            </b-link>
                        </div>
                    </b-col>
                </b-row>
            </b-list-group-item>

            <b-list-group-item>
                <b-row>
                    <b-col cols="5">
                        <span>Components</span>
                    </b-col>
                    <b-col cols="7" class="text-right">
                        <div v-for="(c, i) in component" :key="i">
                            <b-link target="_blank" :href="c.link"
                                >{{ c.name }}
                            </b-link>
                        </div>
                    </b-col>
                </b-row>
            </b-list-group-item>

            <b-list-group-item>
                <p class="mb-2">Chances</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Neuroptics</span>
                    <span>{{ chances.neuroptics }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Chassis</span>
                    <span>{{ chances.chassis }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span>Systems</span>
                    <span>{{ chances.systems }}</span>
                </div>
            </b-list-group-item>

            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
            >
                <b-button block variant="primary" target="_blank" :href="link"
                    >Wiki Details</b-button
                >
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
export default {
    name: 'warframe-list',
    props: {
        name: String,
        img: String,
        blueprint: Array,
        component: Array,
        chances: Object,
        expected: String,
        guaranteed: String,
        link: String
    }
};
</script>

<style scoped></style>
