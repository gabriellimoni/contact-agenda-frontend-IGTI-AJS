<template>
  <section class="section">
    <b-field label="Find a contact">
      <b-autocomplete
        rounded
        v-model="contactName"
        :data="filteredDataArray"
        placeholder="Enter a name"
        icon="magnify"
        @select="option => selected = option">
        <template slot="empty">No results found</template>
      </b-autocomplete>
    </b-field>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="(data, i) of data" :key="i">
        <contact-box :name="data.name" :email="data.email" :avatarURL="data.avatarURL" />
      </div>

      <p v-if="data.length == 0" class="is-size-4"><br>No contacts found</p>
    </div>

    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </section>
</template>

<script>
import ContactBox from '~/components/ContactBox'
const _ = require('lodash')

export default {
  name: 'HomePage',

  components: {
    ContactBox
  },

  created() {
    this.$axios.get('contacts').then(res => {
      this.fullData = res.data.contacts
      this.data = res.data.contacts
      this.isLoading = false
    })
  },

  data() {
    return {
      fullData: [],
      data: [
        { id: 1, name: 'Gabriel Limoni', email: 'gabrielblimoni@gmail.com', avatarURL: 'http://localhost:5001/michael.jpg' },
      ],
      isLoading: true,
      contactName: '',
      selected: null,
    }
  },

  methods: {
    searchUsers: _.debounce(function (name) {
      if (name.trim() == '') this.data = this.fullData
      this.data = this.fullData.filter(data => {
        return data.name
                    .toLowerCase()
                    .includes(name.toLowerCase())
      })
    }, 500)
  },

  computed: {
    nameData() {
      return this.data.map(data => {
        return data.name
      })
    },
    filteredDataArray() {
      return this.nameData.filter((option) => {
        return option
          .toLowerCase()
          .indexOf(this.contactName.toLowerCase()) >= 0
      })
    }
  },

  watch: {
    contactName(name) {
      if (name.length > 2 || name.length == 0) {
        this.searchUsers(name)
      }
    }
  }
}
</script>
