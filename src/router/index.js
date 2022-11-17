import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Index'
import Model from '@/components/Model'
import More from '@/components/More'
import NoData from '@/components/searchComponents/NoSearchResult'
import Load from '@/components/modelComponents/LoadingAnimation.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: HelloWorld
        }, {
            path: '/model/:model_type/:model_id/',
            name: 'Model',
            component: Model
        }, {
            path: '/model/:model_type/',
            name: 'More',
            component: More
        },
        {
            path: '/nodata',
            name: 'NoData',
            component: NoData
        }
        // , {
        //     path: '/load',
        //     component: Load
        // }
    ]
})