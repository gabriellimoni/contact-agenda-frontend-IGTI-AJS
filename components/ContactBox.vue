<template>
    <div class="box">
        <article class="media">
        <div class="media-left">
            <figure class="image is-64x64">
            <img :src="avatarURL" alt="Image">
            </figure>
        </div>
        <div class="media-content">
            <div class="content">
            <p>
                <strong>{{ name }}</strong>
                <br>
                <small>{{ email }}</small>
            </p>
            </div>
        </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'ContactBox',
    props: {
        name: {type: String, required: true},
        email: {type: String, required: true},
        avatarURL: {type: String, required: true},
    }
}
</script>

<style>

</style>