<template>
    <div></div>
</template>

<page-query>
query Post ($id: ID!) {
post(id: $id) {
title,
title_color,
title_meta,
excerpt,
author,
created_at,
category,
image,
image_caption
}
}
</page-query>

<script>
export default {
    name: 'FarmGuide'
};
</script>

<style scoped></style>
