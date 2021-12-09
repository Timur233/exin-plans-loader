<template>
  <div
    id="app"
    class="save-plans"
  >
    <LocationInform
      :uuid="uuid"
      @saveChanges="saveChanges"
    />

    <file-pond
      ref="pond"
      :files="files"
      class="save-plans__file-uploader"
      name="plansUploader"
      label-idle="Загрузить файлы..."
      label-file-processing-complete="Файл загружен"
      label-file-processing="Загрузка"
      label-tap-to-cancel="Отменить"
      label-tap-to-retry="Повторить"
      label-tap-to-undo="Удалить"
      :allow-multiple="true"
      accepted-file-types="image/*"
      :server="server"
      :allow-reorder="true"
    />
  </div>
</template>

<script>
import LocationInform from './components/LocationInform';
import vueFilePond from 'vue-filepond';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
 
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
 

export default {
    name:       "App",
    components: {
        FilePond,
        LocationInform
    },
    data: function() {
        return { 
            baseURL: 'http://localhost/exin/exin.kz/web',
            uuid:    null,
            files:   [
                {
                    source:  'plan906123055.svg',
                    options: {
                        type: 'local',
                    },
                },
            ],
        };
    },
    computed: {
        server: function () {
            return {
                url:     this.baseURL,
                headers: {
                    Authorization: 'Bearer '.concat('aAOI5zskZ1XBssXpH0FIOIv2SFtPJwKg'),
                },
                process: {
                    url:    '/api/plans/upload-plan',
                    onload: response => response
                },
                load: {
                    url: '/media/plans/',
                },
                revert: {
                    url: '/api/plans/remove-plan',
                }
            }
        }
    },
    created() {
        const link = new URL(document.URL);
        const uuid = link.searchParams.get('uuid');

        this.uuid = uuid;
    },
    methods: {
        test: function() {
            console.log(this.getFileslist());
        },
        getFileslist: function() {
            const uploadedFiles = this.$refs.pond.getFiles();
            const planFiles = [];

            uploadedFiles.forEach((fileItem, index) => {
                planFiles.push({
                    position: index,
                    fileName: JSON.parse(fileItem.serverId)
                });
            });

            return planFiles;
        },
        saveChanges: function () {
            const plans = this.getFileslist();

            if (plans.length > 0) {
                fetch(this.baseURL + '/api/plans/save-plans', {
                    method:  'post',
                    headers: {'Authorization': 'Bearer '.concat('aAOI5zskZ1XBssXpH0FIOIv2SFtPJwKg')},
                    body:    JSON.stringify({
                        uuid:  this.uuid,
                        plans: plans
                    })
                }).then((res) => {console.log(res.json())});

                // document.location.href = this.baseURL + '/uuid';
            }
        }
    },
};
</script>

<style lang="scss">
@import url('http://exin.abpx.kz/styles/main.min.css?v=1637826950');
@import './src/assets/style.scss';
</style>