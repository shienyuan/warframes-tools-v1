<template>
    <Layout>
        <template v-slot:header> Resources Calculator</template>

        <b-row tag="section">
            <b-col lg="4" tag="aside">
                <item-selector
                    :primaryData="$page.primary.edges"
                    :secondaryData="$page.secondary.edges"
                    :meleeData="$page.melee.edges"
                    :selectedItems="selectedItems"
                    @onItemSelected="handleItemSelect"
                    @onDeselectAll="handleDeselectAll"
                />
            </b-col>

            <b-col lg="8" tag="aside">
                <total-resources class="mb-3" :selectedItems="selectedItems" />
                <selected-items
                    @onItemRemoved="handleItemRemoved"
                    :selectedItems="selectedItems"
                />
            </b-col>
        </b-row>
    </Layout>
</template>

<page-query>
query {
primary: allPrimary(sortBy:"name" order:ASC){
edges{
node {
id
name
imageName
components{
name
itemCount
imageName
}
}
}
}
secondary: allSecondary(sortBy:"name" order:ASC){
edges{
node {
id
name
imageName
components{
name
itemCount
imageName
}
}
}
}
melee: allMelee(sortBy:"name" order:ASC){
edges{
node {
id
name
imageName
components{
name
itemCount
imageName
}
}
}
}
}
</page-query>

<script>
import { getSeo } from '../utils/seoUtil';

export default {
    name: 'Resource',
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: 'Resources Calculator',
            keywords: 'warframe,warframes,warframe resources calculator',
            description:
                'A resources calculator for Warframe, calculate total resources needed for selected in-game items',
        });
    },
    components: {
        ItemSelector: () => import('~/components/resource/ItemSelector'),
        TotalResources: () => import('~/components/resource/TotalResources'),
        SelectedItems: () => import('~/components/resource/SelectedItems'),
    },
    data() {
        return {
            search: '',
            selectedItems: [],
        };
    },
    computed: {
        getImgUrl() {
            return `https://cdn.warframestat.us/img/`;
        },
    },
    methods: {
        handleItemSelect(item) {
            const itemIndex = this.selectedItems.indexOf(item);

            if (itemIndex < 0) {
                this.selectedItems.push(item);
            } else {
                this.handleItemRemoved(itemIndex);
            }
        },
        handleItemRemoved(i) {
            this.selectedItems.splice(i, 1);
        },
        handleDeselectAll() {
            this.selectedItems = [];
        },
    },
};
</script>
