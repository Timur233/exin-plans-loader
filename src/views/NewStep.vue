<template>
  <div class="save-plans">
    <LocationInform
      :uuid="uuid"
      :is-alert="isAlert"
      :is-error="isError"
      @saveChanges="saveChanges"
      @loadPlans="loadPlans"
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
import LocationInform from '../components/LocationInform';
import vueFilePond from 'vue-filepond';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
 
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
 

export default {
    name:       "NewStep",
    components: {
        FilePond,
        LocationInform
    },
    data: function() {
        return { 
            baseURL: 'https://files.exin.kz:5001',
            uuid:    null,
            isAlert: false,
            isError: false,
            files:   [],
        };
    },
    computed: {
        server: function () {
            return {
                url:     this.baseURL,
                headers: {
                    contentType: 'Bearer '.concat('aAOI5zskZ1XBssXpH0FIOIv2SFtPJwKg'),
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
        getFileslist: function() {
            const uploadedFiles = this.$refs.pond.getFiles();
            const planFiles = [];

            uploadedFiles.forEach((fileItem, index) => {
                planFiles.push({
                    position: index,
                    fileName: returnFileName(fileItem.serverId)
                });
            });

            function returnFileName(string) {
                try {
                    return JSON.parse(string);
                } catch (error) {
                    return string
                }
            }

            return planFiles;
        },
        saveChanges: function () {
            const plans = this.getFileslist();

            console.log(plans);

            if (plans.length > 0) {
                fetch(this.baseURL + '/api/plans/save-plans', {
                    method:  'post',
                    headers: {'Authorization': 'Bearer '.concat('aAOI5zskZ1XBssXpH0FIOIv2SFtPJwKg')},
                    body:    JSON.stringify({
                        uuid:  this.uuid,
                        plans: plans
                    })
                }).then(res => res.json())
                    .then((res) => {
                        if (res === true) {
                            this.isAlert = true;
                            history.back();
                        } else {
                            this.isAlert = true;
                            this.isError = true;
                        }
                    });
            } else {
                return false
            }
        },
        loadPlans: function (plans) {
            this.files = plans.map((plan) => {
                return {
                    source:  plan.image,
                    options: {
                        type: 'local',
                    },
                };
            });
        },
    },
};
</script>