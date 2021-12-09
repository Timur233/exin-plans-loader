<template>
  <div class="location-block save-button__location-info">
    <img
      :src="file.url"
      :alt="file.name"
      :title="file.name"
      class="location-block__img"
    >
    <h3>ЖК {{ project }}</h3>
    <div class="fields">
      <div class="field">
        <strong>
          Комнат
        </strong>
        <span>{{ roomcount }}</span>
      </div>
      <div class="field">
        <strong>
          Площадь
        </strong>
        <span>{{ area }} м2</span>
      </div>
      <div class="field">
        <strong>
          Цена
        </strong>
        <span>{{ pricemin }} тг.</span>
      </div>
      <div class="field">
        <strong>
          Блок
        </strong>
        <span>{{ building_number }}</span>
      </div>
      <div class="field">
        <strong>
          Этаж
        </strong>
        <span>{{ floors }}</span>
      </div>
    </div>
    <button
      class="save-plans__button send_button"
      @click="saveChanges"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
export default {
    name:  "LocationInform",
    props: {
        uuid: {
            type:    String,
            default: null
        },
    },
    data: function () {
        return {
            project:         null,
            roomcount:       null,
            area:            null,
            pricemin:        null,
            building_number: null,
            floors:          null,
            file:            {
                name: null,
                url:  null
            }
        }
    },
    mounted() {
        fetch(this.$parent.baseURL + '/api/plans/get-location', {
            method:  'post',
            headers: {'Authorization': 'Bearer '.concat('aAOI5zskZ1XBssXpH0FIOIv2SFtPJwKg')},
            body:    JSON.stringify({
                uuid: this.uuid,
            })
        })
            .then((res) => { return res.json(); })
            .then((res) => { 
                this.project = res.project;
                this.roomcount = res.roomcount;
                this.area = res.area;
                this.pricemin = res.pricemin;
                this.building_number = res.building_number;
                this.floors = res.floors;
                this.file = res.file;
            });
    },
    methods: {
        saveChanges: function () {
            this.$emit('saveChanges');
        },
    }
};
</script>
