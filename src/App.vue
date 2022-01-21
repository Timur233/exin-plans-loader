<template>
  <div id="app">
    <div class="container">
      <h3 class="title-block">
        Выбрать проект:
      </h3>
      <div class="project project__wrapper">
        <router-link
          v-for="project in projectList"
          :key="project._id"
          :to="'/project-steps?project=' + project._id"
          class="project__link"
        >
          <div class="project__logo-block">
            <img
              :src="'https://cms.abpx.kz' + project.logo.path"
              :alt="project.name"
            >
          </div>
          <span class="project__name">{{ project.name }}</span>          
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
    name:       "App",
    components: {
    },
    data: function() {
        return { 
            projectList: [],
            activeLink:  ''
        };
    },
    computed: {
    },
    mounted() {
        fetch('https://cms.abpx.kz/api/collections/get/eq_projects?token=3993c1da4ef91657d3db1d00b60b70')
            .then(res => res.json())
            .then((res) => {
                this.projectList = res.entries;
            });
    },
    created() {
    },
    methods: {
    },
};
</script>

<style lang="scss">
// @import url('https://exin.abpx.kz/styles/main.min.css?v=1637826950');
@import './src/assets/style.scss';
</style>