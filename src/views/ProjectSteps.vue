<template>
  <div
    id="steps"
    class="steps"
  >
    <div class="container">
      <h3 class="title-block">
        Месяц:
      </h3> 
      <div class="steps__wrapper">
        <div
          v-for="step in buildingSteps"
          :key="step._id"
          class="steps__item building-step"
        >
          <div class="building-step__main-img">
            <img
              :src="getMainImage(step.preview, step.gallery)"
              class="building-step__img"
            >
          </div>
          <div class="building-step__step-information">
            <h4 class="building-step__title">
              {{ months[step.date.split('-')[0]] }} {{ step.date.split('-')[1] }}
            </h4>
            <div class="building-step__gallery step-gallery">
              <div
                v-for="image in step.gallery"
                :key="image.meta.asset"
                class="step-gallery__image-block"
              >
                <img :src="'https://cms.abpx.kz' + image.path">
              </div>
            </div>
          </div>
          <div class="building-step__buttons">
            <button>Редактировать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:  "ProjectSteps",
    props: {
        projectId: {
            type:    String,
            default: null
        },
    },
    data() {
        return {
            buildingSteps: [],
            months:        {
                "01": "Январь",
                "02": "Февраль",
                "03": "Март",
                "04": "Апрель",
                "05": "Май",
                "06": "Июнь",
                "07": "Июль",
                "08": "Август",
                "09": "Сентябрь",
                "10": "Октябрь",
                "11": "Ноябрь",
                "12": "Декабрь"
            },
        }
    },
    watch: {
        $route: 'fetchData'
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            if (this.projectId !== null) {
                fetch('https://cms.abpx.kz/api/collections/get/building_steps?token=3993c1da4ef91657d3db1d00b60b70', {
                    method:  'post',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({
                        filter: {project: this.projectId},
                        limit:  12,
                        sort:   {_created: -1},
                    })
                })
                    .then(res => res.json())
                    .then((res) => {
                        this.buildingSteps = res.entries;
                    });
            }
        },

        getMainImage: function (preview, gallery) {
            if (preview.path) return 'https://cms.abpx.kz' + preview.path

            return 'https://cms.abpx.kz' + gallery[0].path
        }
    }
}
</script>