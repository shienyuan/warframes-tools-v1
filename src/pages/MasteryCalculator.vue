<template>
    <Layout>
        <template v-slot:header>
            Mastery Calculator
        </template>

        <b-row class="mb-5" align-v="stretch">
            <b-col cols="12" lg="4" class="mb-5 mb-lg-0">
                <rank-selector
                    :targetMr.sync="targetMr"
                    :currentMp.sync="currentMp"
                    @onTargetMrInput="handleTargetMrInput"
                    @handleMpInput="handleMpInput"
                />
            </b-col>

            <b-col cols="12" lg="4" class="mb-5 mb-lg-0">
                <mp-requirement :targetMp="targetMp" />
            </b-col>

            <b-col cols="12" lg="4">
                <rank :rank="$page.ranks.edges[targetMr].node" />
            </b-col>
        </b-row>

        <b-table
            dark
            hover
            :fields="methodFields"
            :items="$page.methods.edges"
            sort-by="node.total_MP"
            sort-desc
        ></b-table>
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
import { getSeo } from '../utils/seoUtil';

export default {
    name: 'MasteryRank',
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: 'Mastery Calculator',
            keywords: 'warframe, mastery rank, mastery point',
            description:
                'Warframe Mastery Rank calculator helps player calculate the correct in-game mastery points they need to reach their desired Warframe Mastery Rank'
        });
    },
    components: {
        pageHeader: () => import('~/components/PageHeader'),
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
