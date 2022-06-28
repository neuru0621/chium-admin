<template>
  <v-container
    fluid
    style="margin-top : 100px;"
  >
    <v-card style="padding : 40px; width : 50%; margin : 0 auto; ">
      <h2>사용자 추가</h2>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            이름
          </v-subheader>
        </v-col>
        <v-col>
          <v-text-field
            solo
            hide-details=""
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            권한
          </v-subheader>
        </v-col>
        <v-col>
          <v-text-field
            placeholder="102~199"
            solo
            hide-details=""
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            부서
          </v-subheader>
        </v-col>
        <v-col>
          <v-autocomplete
            solo
            hide-details=""
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            직급
          </v-subheader>
        </v-col>
        <v-col>
          <v-autocomplete
            solo
            hide-details=""
          />
        </v-col>
      </v-row>

      <v-row justify="end">
        <v-col cols="auto">
          <v-btn>
            완료 🚀
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>
