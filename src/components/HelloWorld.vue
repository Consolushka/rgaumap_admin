<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/timacad-logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
    </v-row>
    <v-form v-model="valid">
      <v-row class="d-flex flex-column align-center justify-center">
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            type="password"
            label="Пароль"
            required
          ></v-text-field>
        </v-col>

        <v-btn
      color="success"
      class="mr-4"
      @click="LogIn"
      style="background-color: #3d7648"
    >
      Войти
    </v-btn>
      </v-row>
  </v-form>
  </v-container>
</template>

<script>
  import router from "../router";

  export default {
    name: 'HelloWorld',

    data: () => ({
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
    methods:{
      LogIn(){
        console.log(this.email, this.password);
        router.push({name: "Main"});
      }
    }
  }
</script>
