<template>
    <b-card class="mt-4" bg-variant="dark" :header="data.name">
        <h5>Materials</h5>
        <b-list-group
            :horizontal="true"
            class="mb-4 d-flex align-self-center scroll-bar"
            style="overflow: scroll;"
        >
            <b-list-group-item variant="dark">
                <b-img
                    :src="`${data.img}?tr=w-35,h-35`"
                    width="35"
                    height="35"
                    :alt="`warframe-${data.name}`"
                />
                <p class="mb-0 text-center">1</p>
            </b-list-group-item>

            <div class="mx-3 h3 d-flex align-self-center">
                <b-icon
                    class="d-block text-secondary"
                    icon="arrow-left-square-fill"
                ></b-icon>
            </div>

            <b-list-group-item
                variant="dark"
                v-for="(m, i) in data.mats"
                :key="i"
                class="text-center"
            >
                <b-link
                    :href="
                        !m.name
                            ? ''
                            : `https://warframe.fandom.com/wiki/${m.name}`
                    "
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
        <b-list-group
            class="scroll-bar"
            :horizontal="true"
            style="overflow: scroll;"
        >
            <b-list-group-item variant="dark">
                <p class="mb-1">{{ data.method }}</p>
                <div v-if="data.location">
                    <em class="small ">Recommend Location:</em>
                    <p class="mb-0">{{ data.location }}</p>
                </div>
            </b-list-group-item>
            <b-list-group-item variant="dark">
                <p class=" mb-2">Chance</p>
                <p class="mb-0">{{ data.chance }}</p>
            </b-list-group-item>
            <b-list-group-item variant="dark">
                <p class=" mb-2">Expected</p>
                <p class="mb-0">{{ data.expected }}</p>
            </b-list-group-item>
            <b-list-group-item variant="dark">
                <p class=" mb-2">Guaranteed</p>
                <p class="mb-0">{{ data.guaranteed }}</p>
            </b-list-group-item>
        </b-list-group>
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

<style scoped>
.scroll-bar::-webkit-scrollbar {
    display: none;
}
.scroll-bar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
