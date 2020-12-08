<template>
    <b-card header="Rank Selector">
        <p class="text-sm text-info">
            Enter your desired mastery rank to reach below, if you prefer you
            may enter your current MP to get exact values.
        </p>
        <b-form-group label-for="mr" label="Mastery Rank" class="text-white">
            <b-form-input
                class="border-primary"
                size="lg"
                id="mr"
                type="number"
                v-model.number="targetMr"
                placeholder="0"
                :formatter="formatMR"
                :min="0"
                :max="30"
                @input="
                    $emit('update:targetMr', targetMr);
                    $emit('onTargetMrInput');
                "
            ></b-form-input>
        </b-form-group>
        <b-form-group
            class="text-white"
            label-for="mr"
            label="Current Player MP"
            description="Leave this field 0 will show default values"
        >
            <b-form-input
                size="lg"
                id="mr"
                type="number"
                v-model.number="currentMp"
                placeholder="0"
                :formatter="formatMP"
                @input="
                    $emit('update:currentMp', currentMp);
                    $emit('handleMpInput');
                "
            ></b-form-input>
        </b-form-group>
    </b-card>
</template>

<script>
export default {
    name: 'RankSelector',
    data() {
        return {
            targetMr: 0,
            currentMp: 0
        };
    },
    methods: {
        formatMR(val) {
            if (val < 0) return 0;
            if (val > 30) return 30;
            return val;
        },
        formatMP(val) {
            const maxMP = 2500 * (30 * 30);
            return val > maxMP ? maxMP : val;
        }
    }
};
</script>

<style scoped></style>
