<template>
  <div>
    <v-dialog v-model="dialog" persistent width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="add-actor-btn" v-bind="attrs" v-on="on">
          {{ parentData.btnName }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h3>{{ parentData.btnName }}</h3>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="entityForm"
            v-model="valid"
            @submit.prevent="onSaveData()"
          >
            <v-text-field
              v-model="entityFormData.entityName"
              solo
              :placeholder="parentData.placeholder1"
              :label="parentData.field1"
              :rules="entityNameRules"
              required
            ></v-text-field>
            <v-label>DOB*</v-label>
            <v-text-field
              v-model="entityFormData.dateOfBirth"
              solo
              type="date"
              :rules="entityDOBRules"
              :max="today"
              required
            ></v-text-field>
            <div>
              <v-textarea
                rows="3"
                solo
                name="entityBio"
                v-model="entityFormData.entityBio"
                label="Bio"
                placeholder="Describe the person's bio.."
              ></v-textarea>
            </div>
            <v-select
              v-model="entityFormData.entityGender"
              :items="genders"
              :rules="entityGenderRules"
              required
              label="Gender*"
            ></v-select>
            <div class="card-actions-btns">
              <v-spacer></v-spacer>
              <v-btn @click="onCloseDialog()" class="mr-3 close-btn"> Close </v-btn>
              <v-btn :disabled="!valid" type="submit" class="save-btn"> Save </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';

export default {
  props: {
    parentData: Object,
  },
  data() {
    return {
      dialog: false,
      valid: false,
      isError: false,
      entityFormData: {
        dateOfBirth: null,
        entityName: "",
        entityBio: "",
        entityGender: null,
      },
      genders: ["Male", "Female", "Other"],
      entityNameRules: [(v) => !!v || "Name is required"],
      entityDOBRules: [(v) => !!v || "DOB is required"],
      entityGenderRules: [(v) => !!v || "Gender is required"],
    };
  },
  computed:{
    ...mapGetters(['loading','newActor','newProducer','today']),
  },
  methods: {
    ...mapActions(['addActorProducer']),
    onCloseDialog() {
      this.$refs.entityForm.reset();
      this.dialog=false;
    },
    onSaveData() {
      let body = {
        name: this.entityFormData.entityName,
        bio: this.entityFormData.entityBio,
        gender: this.entityFormData.entityGender,
        dob: this.entityFormData.dateOfBirth,
      };
      this.addActorProducer({body:body,type:this.parentData.type}).then(()=>{
        if(this.parentData.type==='actor') this.$emit("newActor", this.newActor);
        else this.$emit("producersNew", this.newProducer);
        this.dialog=false;
      })
    },
  },
};
</script>

<style scoped>
.add-actor-btn {
  width: 100%;
}
.card-actions-btns {
  display: flex;
}
.close-btn{
  background-color: gray !important;
  color: white;
  margin-right: 10px;
}
.save-btn{
  background-color: green !important;
  color: white;
}
</style>
