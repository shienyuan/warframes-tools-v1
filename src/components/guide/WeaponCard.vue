<template>
    <div>
        <q :cite="data.link">{{ data.intro }}</q
        ><span class="text-secondary"> -- Warframe Wiki</span>

        <b-card class="mt-3" no-body text-variant="dark" :header="data.name">
            <b-list-group flush>
                <b-list-group-item class="text-center" variant="dark">
                    <b-img
                        height="150"
                        :src="data.img"
                        :alt="`warframe-${data.name}`"
                    />
                </b-list-group-item>
                <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                >
                    <span>Mastery</span>
                    <span>{{ data.mastery }}</span>
                </b-list-group-item>
                <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                >
                    <span>Type</span>
                    <span>{{ data.type }}</span>
                </b-list-group-item>
                <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                >
                    <span>Trigger</span>
                    <span>{{ data.trigger }}</span>
                </b-list-group-item>
                <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                >
                    <span>Acquisition</span>
                    <span>{{ data.acquisition }} </span>
                </b-list-group-item>
                <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                >
                    <span>Acquire Difficulty</span>
                    <span>
                        <b-form-rating
                            class="p-0"
                            :value="data.acLevel"
                            no-border
                            readonly
                        ></b-form-rating>
                    </span>
                </b-list-group-item>

                <b-list-group-item>
                    <b-embed
                        :src="data.video"
                        allowfullscreen
                        type="iframe"
                        aspect="16by9"
                    >
                    </b-embed>
                </b-list-group-item>
            </b-list-group>
            <b-card-footer
                ><b-button
                    block
                    target="_blank"
                    variant="primary"
                    :href="data.link"
                    >More Details</b-button
                ></b-card-footer
            >
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'WeaponCard',
    props: {
        data: Object
    }
    // props: {
    //     name: String,
    //     img: String,
    //     intro: String,
    //     mastery: String,
    //     type: String,
    //     trigger: String,
    //     link: String
    // }
};
</script>

<style scoped></style>
