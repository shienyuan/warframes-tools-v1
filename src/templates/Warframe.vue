<template>
    <Layout>
        <template v-slot:header>
            {{ $page.warframes.name }}
        </template>
        123
        {{ $page.warframes.name }}
    </Layout>
</template>

<page-query>
query ($id: ID) {
  warframes(id: $id) {
    name
  }
}
</page-query>

<script>
export default {
    name: 'Warframe',
    data() {
        return {
            yo: '1'
        };
    }
};
</script>

<style scoped></style>
