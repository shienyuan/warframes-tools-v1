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
                <b-card bg-variant="dark">
                    <p class="text-sm text-info">
                        Enter your desired mastery rank to reach below, if you
                        prefer you may enter your current MP to get exact
                        values.
                    </p>
                    <b-form-group
                        label-for="mr"
                        label="Mastery Rank"
                        class="text-white"
                    >
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
                            @input="handleTargetMrInput"
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
                            @input="handleMpInput"
                        ></b-form-input>
                    </b-form-group>
                </b-card>
            </b-col>

            <b-col cols="4">
                <b-card
                    bg-variant="dark text-white"
                    class="text-center h-100 d-flex flex-column align-self-center"
                >
                    <b-card-body
                        class="d-flex flex-column justify-content-center h-100"
                    >
                        <h1 class="display-4 font-weight-bold">
                            {{ targetMp || 0 }}
                        </h1>
                        <p class="text-info mb-0">MP required</p>
                    </b-card-body>
                </b-card>
            </b-col>

            <b-col cols="4">
                <rank :rank="$page.ranks.edges[targetMr].node"></rank>
            </b-col>
        </b-row>

        <b-card header="Mastery Point Table" bg-variant="dark text-white">
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
        rank: () => import('../components/masteryCalculator/rank')
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
        formatMR(val) {
            if (val < 0) return 0;
            if (val > 30) return 30;
            return val;
        },
        formatMP(val) {
            const maxMP = 2500 * (30 * 30);
            return val > maxMP ? maxMP : val;
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
