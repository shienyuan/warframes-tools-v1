<template>
    <b-jumbotron
        class="bg-image bg-dark text-white text-center mb-5 p-0"
        header-level="5"
        bg-variant="light"
    >
        <div class="h-100 w-100" style="background-color: rgba(0,40,60,0.7)">
            <h1 class="mb-0 p-5 font-weight-bold" style="letter-spacing: 3px">
                {{ title }}
            </h1>
        </div>
    </b-jumbotron>
</template>

<script>
export default {
    name: 'PageHeader',
    props: {
        title: String,
        intro: String
    }
};
</script>

<style scoped>
.bg-image {
    background-image: url('https://ik.imagekit.io/seaw0jfghdk/bg-1_-UKzgcFbk.jpg/tr:h-200,w-300');
    background-position: center;
    background-size: cover;
}
</style>
