<template>
    <b-card class="mt-4" :header="data.name" text-variant="dark">
        <h5>Materials</h5>
        <b-list-group
            horizontal
            class="mb-4 d-flex align-self-center"
            style="overflow: scroll"
        >
            <b-list-group-item>
                <b-img
                    :src="`${data.img}?tr=w-35,h-35`"
                    width="35"
                    height="35"
                    :alt="`warframe-${data.name}`"
                />
                <p class="mb-0 text-center">1</p>
            </b-list-group-item>

            <div class="mx-3 h3 d-flex align-self-center">
                <b-icon class="d-block" icon="arrow-left-square-fill"></b-icon>
            </div>

            <b-list-group-item
                v-for="(m, i) in data.mats"
                :key="i"
                class="text-center"
            >
                <b-link
                    :href="`https://warframe.fandom.com/wiki/${m.name}`"
                    target="_blank"
                >
                    <b-img
                        :src="`${m.img}?tr=w-35,h-35`"
                        width="35"
                        height="35"
                        :alt="`warframe-${m.name}`"
                    />
                    <p class="mb-0 text-center">{{ m.amount }}</p>
                </b-link>
            </b-list-group-item>
        </b-list-group>

        <h5>Drop</h5>
        <b-list-group horizontal style="overflow: scroll">
            <b-list-group-item>
                <p class="mb-1">{{ data.method }}</p>
                <div v-if="data.location">
                    <em class="small text-secondary">Recommend Location:</em>
                    <p class="mb-0">{{ data.location }}</p>
                </div>
            </b-list-group-item>
            <b-list-group-item>
                <p class="text-secondary mb-2">Chance</p>
                <p class="mb-0">{{ data.chance }}</p>
            </b-list-group-item>
            <b-list-group-item>
                <p class="text-secondary mb-2">Expected</p>
                <p class="mb-0">{{ data.expected }}</p>
            </b-list-group-item>
            <b-list-group-item>
                <p class="text-secondary mb-2">Guaranteed</p>
                <p class="mb-0">{{ data.guaranteed }}</p>
            </b-list-group-item>
        </b-list-group>
        <!--                <b-table-->
        <!--                    dark-->
        <!--                    bordered-->
        <!--                    hover-->
        <!--                    :fields="['Location', 'Chance', 'Expected', 'Guaranteed']"-->
        <!--                    :items="[-->
        <!--                        {-->
        <!--                            Location: 'Basic Granum Void (Rotation C)',-->
        <!--                            Chance: '11.1%',-->
        <!--                            Expected: '9 – 10',-->
        <!--                            Guaranteed: '59 ± 20'-->
        <!--                        }-->
        <!--                    ]"-->
        <!--                ></b-table>-->
    </b-card>
</template>

<script>
export default {
    name: 'Blueprint',
    props: {
        data: Object
    }
};
</script>

<style scoped></style>
