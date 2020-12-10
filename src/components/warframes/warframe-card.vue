<template>
    <b-card no-body :header="name">
        <b-list-group flush>
            <b-list-group-item class="text-center">
                <b-img height="100" :src="img" :alt="`warframe-${name}`" />
            </b-list-group-item>

            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
            >
                <span>Blueprint</span>
                <span>{{ blueprint }}</span>
            </b-list-group-item>

            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
            >
                <span>Components</span>
                <span>{{ component }}</span>
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
                <span>Expected</span>
                <span>{{ expected }}</span>
            </b-list-group-item>

            <b-list-group-item
                class="d-flex justify-content-between align-items-center"
            >
                <span>Guaranteed</span>
                <span>{{ guaranteed }}</span>
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
        blueprint: String,
        component: String,
        chances: Object,
        expected: String,
        guaranteed: String,
        link: String
    }
};
</script>

<style scoped></style>
