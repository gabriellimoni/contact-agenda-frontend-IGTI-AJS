<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      Add Contact
    </h2>

    <new-contact-form />
  </section>
</template>

<script>
import NewContactForm from '../components/NewContactForm.vue'
export default {
  components: {
    NewContactForm
  }
}
</script>