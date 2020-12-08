<template>
    <b-card no-body header="Mastery Rank">
        <b-list-group flush>
            <b-list-group-item class="text-center">
                <p>{{ rank.img_url }}</p>
                <div style="height: 70px" v-show="!rank.img_url">
                    <em class="block">No Image</em>
                </div>
                <ik-image
                    v-show="rank.img_url"
                    :path="rank.img_url"
                    :transformation="[{ height: 70, width: 70 }]"
                    height="70"
                    :alt="`warframe-mastery-rank-${rank.name}`"
                />
            </b-list-group-item>

            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
            >
                <span>Name</span>
                <span>{{ rank.name }}</span>
            </b-list-group-item>

            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
            >
                <span>Level</span>
                <span>{{ rank.level }}</span>
            </b-list-group-item>

            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
            >
                <span>Test</span>
                <span class="overflow-hidden w-50 text-right">{{
                    rank.test
                }}</span>
            </b-list-group-item>

            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
            >
                <span>Test Video</span>
                <b-link v-if="rank.test_url" :href="rank.test_url"
                    >YouTube</b-link
                >
                <span v-else>None</span>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
export default {
    name: 'rank',
    props: {
        rank: Object
    }
};
</script>

<style scoped></style>
