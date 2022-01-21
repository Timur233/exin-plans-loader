import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import NewStep from '../views/NewStep.vue'
import ProjectSteps from '../views/ProjectSteps.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:      '/about',
        name:      'About',
        component: About
    },
    {
        path:      '/new-step',
        name:      'NewStep',
        component: NewStep
    },
    {
        path:      '/project-steps',
        name:      'ProjectSteps',
        component: ProjectSteps,
        props:     route => ({ projectId: route.query.project })
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
