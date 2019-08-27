<template>
    <div class="columns">
        <div class="column is-6">
            <b-field label="Name">
                <b-input v-model="name"></b-input>
            </b-field>
            
            <b-field label="Email">
                <b-input v-model="email"></b-input>
            </b-field>

            <b-field class="file">
                <b-upload v-model="file" accept="image/*">
                    <a class="button is-primary">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload avatar</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="file">
                    {{ file.name }}
                </span>
            </b-field>

            <b-button 
                type="is-success" 
                @click="addContact"
                :loading="isLoading">Add Contact</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactBox',
    data() {
        return {
            name: '',
            email: '',
            avatarURL: '',

            file: null,
            isLoading: false
        }
    },
    methods: {
        addContact() {
            try {
                this.validateForm()

                this.isLoading = true
                this.$axios.post('contacts', this.getData()).catch(e => {
                    this.gotError(e)
                }).finally(() => {
                    setTimeout(() => {
                        this.isLoading = false
                        this.addedContact()
                    }, 1000)
                })
            }
            catch (e) {
                // TODO
            }
        },

        addedContact() {
            this.$buefy.toast.open({
                duration: 2000,
                message: `Contact added successfully`,
                position: 'is-bottom',
                type: 'is-success'
            })

            this.clear()
        },
        
        gotError(error) {
            this.$buefy.toast.open({
                duration: 2000,
                message: `Error adding contact: ${error}`,
                position: 'is-bottom',
                type: 'is-danger'
            })
        },

        getData() {
            return {
                name: this.name,
                email: this.email,
                avatarURL: this.avatarURL,
            }
        },

        validateForm() {
            if (this.name == '' || this.email == '' || this.avatarURL == '') {
                this.$buefy.toast.open({
                    duration: 2000,
                    message: `Fill the inputs correctly please...`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })

                throw new Error('Invalid inputs')
            }
        },

        clear() {
            this.name = ''
            this.email = ''
            this.avatarURL = ''

            this.$router.push({
                path: '/'
            })
        }
    },
    watch: {
        file: function (file) {
            this.avatarURL = URL.createObjectURL(file)
        }
    }
}
</script>

<style>

</style>