<template>
  <div class="location-block save-plans__location-info">
    <a
      :href="file.url"
      target="_blank"
    >
      <img
        :src="file.url"
        :alt="file.name"
        :title="file.name"
        class="location-block__img"
      >
    </a>
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
    <div 
      v-show="isAlert" 
      class="alert"
      :class="{'alert__error': isError}"
    >
      {{ isError ? 'Возникла ошибка при сохранении! Обновите страницу и попробуйте снова.' : 'Сохранено' }}
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
        isError: {
            type:    Boolean,
            dafault: false
        },
        isAlert: {
            type:    Boolean,
            dafault: false
        }
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
            },
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
                this.plans = res.plans;

                this.$emit('loadPlans', res.plans);
            });
    },
    methods: {
        saveChanges: function () {
            this.$emit('saveChanges');
        }
    }
};
</script>
