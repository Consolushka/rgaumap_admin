<template>
  <v-container fluid>
    <v-row align="center" class="d-flex flex-column">
      <v-col
          class="d-flex"
          cols="12"
          sm="6"
      >
        <v-select
            :items="items"
            item-text="fullName"
            item-value="id"
            persistent-hint
            return-object
            single-line
            v-model="selectedBuilding"
            label="Outlined style"
            outlined
            @change="selectBuilding()"
        ></v-select>
      </v-col>
      <v-col v-if="showSelection">
        <v-row>
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
          <v-col>
            <v-icon>mdi-magnify</v-icon>
          </v-col>
          <v-col @click="CreateNew">Добавить новое</v-col>
        </v-row>
        <v-row v-if="currentRooms.length > 0" class="d-flex flex-wrap">
          <v-btn v-for="room in currentRooms" :key=room.id
              elevation="2"
              outlined
              plain
                 @click="selectRoom(room)"
                 class=" mr-4 mb-4"
          >{{room.name}}</v-btn>
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
  </v-container>
</template>

<script>
import {Room, Fac, Owner, RoomPurpose} from "../classes/room";
import {blds, caths, facss, rps} from "../classes/data";
import {PurposeTranslator} from "../utils/utils";

export default {
  data: () => ({
    items: blds,
    caths: caths,
    facs: facss,
    rps: rps,
    currentRooms: [],
    buildings: [],
    selectedRoom: new Room(0, "", "", new Owner(0,""), new Fac(0,""), new RoomPurpose(0, "")),
    selectedBuilding: "",
    selectedFloor: "",
    floorsInBld: [],
    showRoom: false,
    showSelection: false,
    select: {state: 'Florida', abbr: 'FL'},
  }),
  methods: {
    selectBuilding() {
      this.showSelection = true;
      this.floorsInBld = [];
      console.log(this.selectedBuilding.rooms);

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
      this.selectedRoom = new Room(0, "", "", new Owner(0,""), new Fac(0,""));
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
      this.selectedRoom = new Room(0, "", "", new Owner(0,""), new Fac(0,""));
      this.showRoom = false;
      console.log(this.currentRooms);
    },
    selectRoom(room){
      this.selectedRoom = room;
      this.showRoom = true;
      console.log(this.selectedRoom);
    },
    CreateNew(){
      this.showRoom = true;
      this.selectedRoom = new Room(0, "", "", new Owner(0,""), new Fac(0,""));
    },
    Post(){
      console.log(this.selectedRoom);
      let res = {
        id: this.selectedRoom.id,
        name: this.selectedRoom.name,
        fac: this.selectedRoom.fac.id,
        owner: this.selectedRoom.owner.id,
        purpose: this.selectedRoom.purpose.id
      };
      console.log(res);
    },
    Remove(){
      console.log(this.selectedRoom);
      let res = {
        id: this.selectedRoom.id,
        name: this.selectedRoom.name,
        fac: this.selectedRoom.fac.id,
        owner: this.selectedRoom.owner.id,
        purpose: this.selectedRoom.purpose.id
      };
      console.log(res);
    }
  },
  created() {
    blds.forEach((building) => {
      let purpose = "";
      if (PurposeTranslator[building.purpose] !== undefined) {
        purpose = PurposeTranslator[building.purpose];
      }
      building.fullName = `${purpose}${building.name}`
    });
    console.log(rps);
  }
}
</script>