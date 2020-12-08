<template>
    <Layout>
        <b-jumbotron
            class="header-bg text-white text-center mb-5"
            header="Mastery Rank Calculator"
            header-level="5"
            bg-variant="light"
        >
        </b-jumbotron>

        <b-row class="mb-5" align-v="stretch">
            <b-col cols="4">
                <rank-selector
                    :targetMr.sync="targetMr"
                    :currentMp.sync="currentMp"
                    @onTargetMrInput="handleTargetMrInput"
                    @handleMpInput="handleMpInput"
                />
            </b-col>

            <b-col cols="4">
                <mp-requirement :targetMp="targetMp" />
            </b-col>

            <b-col cols="4">
                <rank :rank="$page.ranks.edges[targetMr].node" />
            </b-col>
        </b-row>

        <!--        <b-card header="Recommended Items" class="mb-5"></b-card>-->

        <b-card
            header="Mastery Point Table"
            bg-variant="dark"
            text-variant="white"
        >
            <b-table
                dark
                bordered
                hover
                :fields="methodFields"
                :items="$page.methods.edges"
                sort-by="node.total_MP"
                sort-desc
            ></b-table>
        </b-card>
    </Layout>
</template>

<page-query>
query {
methods: allMrcMethods {
edges {
node {
id
category
count
total_MP
}
}
}
ranks: allMrcRanks(sortBy:"level" order: ASC) {
edges {
node {
id
name
level
test
test_url
img_url
}
}
}
}
</page-query>

<script>
export default {
    name: 'MasteryRank',
    metaInfo: {
        title: 'Mastery Calculator'
    },
    components: {
        rank: () => import('~/components/masteryCalculator/Rank'),
        recommends: () => import('~/components/masteryCalculator/Recommends'),
        rankSelector: () =>
            import('~/components/masteryCalculator/RankSelector'),
        MpRequirement: () =>
            import('~/components/masteryCalculator/MpRequirement')
    },
    created() {},
    data() {
        return {
            targetMr: 0,
            targetMp: 0,
            currentMr: 0,
            currentMp: 0,
            isDefault: true,
            methodFields: [
                {
                    key: 'node.category',
                    label: 'Category'
                },
                {
                    key: 'node.count',
                    label: 'Count'
                },
                {
                    key: 'node.total_MP',
                    label: 'Total MP',
                    sortable: true
                }
            ]
        };
    },
    methods: {
        handleTargetMrInput() {
            if (this.isDefault) {
                this.currentMp = this.getBaseMp(this.currentMr);
            }

            const tmp = this.getBaseMp(this.targetMr) - this.currentMp;

            this.targetMp =
                tmp <= 0 ? 0 : this.getBaseMp(this.targetMr) - this.currentMp;
        },
        handleMpInput() {
            if (this.currentMp > 0) {
                this.isDefault = false;
            }

            if (this.currentMp === 0) {
                this.isDefault = true;
            }

            this.currentMr = this.convertPointToRank();
            this.handleTargetMrInput();
        },
        convertPointToRank() {
            return Math.floor(Math.pow(this.currentMp / 2500, 1.0 / 2));
        },
        getBaseMp(p) {
            return 2500 * Math.pow(p, 2);
        }
    }
};
</script>

<style scoped>
.header-bg {
    background-image: url('../assets/bg.png');
    background-position: center center;
}
</style>
