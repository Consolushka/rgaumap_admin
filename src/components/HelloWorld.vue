<template>
  <v-container fluid style="margin-top: -100px">
    <v-progress-circular v-if="loaded"
                         indeterminate
                         :size="100"
                         :width="10"
                         color="#3d7648"
    ></v-progress-circular>
    <v-row align="center" class="d-flex flex-column jq-test" v-if="!loaded">
      <img src="https://eldala.kz/uploads/all/08/3f/a2/083fa256914b2fd099e52cff61842a2e.jpg" height="227" width="328" style="margin-bottom: 20px">
      <v-col
          class="d-flex"
          cols="12"
          sm="6"
      >
        <v-select
            :items="buildings"
            item-text="fullName"
            item-value="id"
            persistent-hint
            return-object
            single-line
            v-model="selectedBuilding"
            label="Выберите корпус"
            outlined
            @change="selectBuilding()"
        ></v-select>
      </v-col>
      <v-col v-if="showSelection"
             cols="12"
             sm="6">
        <v-row style="margin: 0;justify-content: space-between;">
          <v-col
              width="50" cols="2" style="margin-top: -12px; padding: 0">
            <v-select
                :items=floorsInBld
                v-model="selectedFloor"
                item-text="number"
                item-value="number"
                type="text"
                label="Этаж"
                @change="selectFloor"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-btn style="margin-right: -40px" color="success" @click="CreateNew">Добавить новый кабинет</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="currentRooms.length > 0" class="d-flex flex-wrap">
          <v-btn v-for="room in currentRooms" :key=room.id
                 elevation="2"
                 outlined
                 plain
                 @click="selectRoom(room)"
                 class=" mr-4 mb-4"
          >{{ room.name }}
          </v-btn>
        </v-row>
      </v-col>
      <v-col
          cols="12"
          sm="6"
      >
        <v-form v-if="showRoom">
          <v-text-field
              v-model="selectedRoom.name"
              type="text"
              label="Название"
          ></v-text-field>
          <v-text-field
              v-model="selectedRoom.flr"
              type="text"
              label="Этаж"
          ></v-text-field>
          <v-select
              :items=caths
              v-model="selectedRoom.owner.id"
              item-text="name"
              item-value="id"
              type="text"
              label="Институт"
          ></v-select>
          <v-select
              :items=facs
              v-model="selectedRoom.fac.id"
              item-text="name"
              item-value="id"
              type="text"
              label="Факультет"
          ></v-select>
          <v-select
              :items=rps
              v-model="selectedRoom.purpose.id"
              item-text="name"
              item-value="id"
              type="text"
              label="Назначение кабинета"
          ></v-select>
          <v-btn color="success" @click="Post" class="mr-10">Готово</v-btn>
          <v-btn color="red" @click="Remove">Удалить</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar v-model="isSuccessRequest" color="green" timeout="2000">Успешно</v-snackbar>
    <v-snackbar v-model="isErrorRequest" color="red" timeout="2000">Ошибка</v-snackbar>
  </v-container>
</template>

<style>
.cc {
  width: 80%;
}
</style>

<script>
import {Room, Fac, Owner, RoomPurpose} from "../classes/room";
import {PurposeTranslator} from "../utils/utils";

export default {
  data: () => ({
    buildings: [],
    caths: [],
    facs: [],
    rps: [],
    loaded: true,
    currentRooms: [],
    selectedRoom: new Room(0, "", "", new Owner(0, ""), new Fac(0, ""), new RoomPurpose(0, "")),
    selectedBuilding: "",
    selectedFloor: "",
    floorsInBld: [],
    showRoom: false,
    showSelection: false,
    logo: require('../assets/timacad-logo.png'),
    select: {state: 'Florida', abbr: 'FL'},
    isSuccessRequest: false,
    isErrorRequest: false,
  }),
  methods: {
    selectBuilding() {
      this.showSelection = true;
      this.floorsInBld = [];
      console.log(this.selectedBuilding);

      this.selectedBuilding.rooms.forEach((room) => {
        let flag = false;
        this.floorsInBld.forEach((flr) => {
          if (flr.number === room.flr) {
            flag = true;
          }
        });
        if (!flag) {
          this.floorsInBld.push({number: room.flr, rooms: [room]});
        } else {
          this.floorsInBld.forEach((flr) => {
            if (flr.number === room.flr) {
              flr.rooms.push(room);
            }
          });
        }
      });
      this.floorsInBld.sort((a, b) => {
        return a.number - b.number
      });
      console.log(this.floorsInBld);
      console.log(this.selectedBuilding);
      this.selectedRoom = new Room(0, "", "", new Owner(0, ""), new Fac(0, ""));
      this.selectedFloor = 0;
      this.currentRooms = [];
      this.showRoom = false;
    },
    selectFloor() {
      let rms = [];
      this.floorsInBld.forEach((flr) => {
        if (flr.number === this.selectedFloor) {
          rms = flr.rooms;
        }
      });
      this.currentRooms = rms;
      this.selectedRoom = new Room(0, "", "", new Owner(0, ""), new Fac(0, ""));
      this.showRoom = false;
      console.log(this.currentRooms);
    },
    selectRoom(room) {
      this.selectedRoom = room;
      this.showRoom = true;
      console.log(this.selectedRoom);
    },
    CreateNew() {
      this.showRoom = true;
      this.selectedRoom = new Room(0, "", "", new Owner(0, ""), new Fac(0, ""));
    },
    Post() {
      console.log(this.selectedRoom);
      let res = {
        id: this.selectedRoom.id,
        building: this.selectedBuilding.id,
        name: this.selectedRoom.name,
        flr: this.selectedRoom.flr,
        fac: this.selectedRoom.fac.id,
        owner: this.selectedRoom.owner.id,
        purpose: this.selectedRoom.purpose.id
      };
      if (res.id === 0) {
        this.axios.post(`/rgaumap_admin/default/api`, res)
            .then(() => {
              this.isSuccessRequest = true;
            })
            .catch(() => {
              this.isErrorRequest = true;
            })
      } else {
        this.axios.put(`/rgaumap_admin/default/api`, res)
            .then(() => {
              this.isSuccessRequest = true;
            })
            .catch(() => {
              this.isErrorRequest = true;
            })
      }
      console.log(res);
    },
    Remove() {
      console.log(this.selectedRoom);
      let res = {
        id: this.selectedRoom.id,
        name: this.selectedRoom.name,
        fac: this.selectedRoom.fac.id,
        owner: this.selectedRoom.owner.id,
        purpose: this.selectedRoom.purpose.id
      };
      this.axios.delete(`/rgaumap_admin/default/api/${res.id}`)
            .then(() => {
              this.isSuccessRequest = true;
            })
            .catch(() => {
              this.isErrorRequest = true;
            })
      console.log(res);
    }
  },
  created() {
    this.axios.get('/rgaumap_admin/default/api/person/1')
        .then(response => {
          this.buildings = response.data.buildings;
          this.caths = response.data.caths;
          this.facs = response.data.facs;
          this.rps = response.data.rps;
          this.buildings.forEach((building) => {
            let purpose = "";
            if (PurposeTranslator[building.purpose] !== undefined) {
              purpose = PurposeTranslator[building.purpose];
            }
            building.fullName = `${purpose}${building.name}`
          });
          this.loaded = false;
          console.log(this.buildings);
        })
        .catch(() => {
          this.loaded = false;
          console.log("error");
        });
  }
}
</script>