import Vue from 'vue'
import Router from 'vue-router'
import dcp from '@/components/dcp'
import routeError from '@/components/common/RouteError'
import blackroute from '@/components/common/BlackRoute'
import dataApply from '@/components/data/apply'
import dataReview from '@/components/data/review'
import dataAudited from '@/components/data/audited'
import resourceApply from '@/components/resource/apply'
import resourceApplySubmit from '@/components/resource/applysubmit'
import resourceApplyEdit from '@/components/resource/applyedit'
import resourceApplyFiles from '@/components/resource/applyFiles'
import resourceApplyFilesAudit from '@/components/resource/applyFilesAudit'
import resourceApplytable from '@/components/resource/applytable'
import resourceApplyCheck from '@/components/resource/applycheck'
import resourceApplyCheckFile from '@/components/resource/applycheckfile'
import resourceReview from '@/components/resource/review'
import resourceAudited from '@/components/resource/audited'
import catalog from '@/components/resource/catalog'
import release from '@/components/resource/release'
import apply from '@/components/serve/apply'
import serveReview from '@/components/serve/review'
import serveAudited from '@/components/serve/audited'
import test from '@/components/serve/test'
import applied from '@/components/serve/applied'
import main from '@/components/main/main'
import login from '@/components/login/login1'
import user from '@/components/system/user'
import department from '@/components/system/department'
import organ from '@/components/system/organ'
import region from '@/components/system/region'
import tag from '@/components/system/tag'
import node from '@/components/monitor/node'
import nodedetails from '@/components/monitor/nodedetails'
import serviceManager from '@/components/monitor/serviceManager'
import servicedetails from '@/components/monitor/servicedetails'
import virtualNode from '@/components/monitor/virtualNode'
import virtualNodelookup from '@/components/monitor/virtualNodelookup'
import serviceDiscovery from '@/components/monitor/serviceDiscovery'
import configurationManagement from '@/components/monitor/configurationManagement'
import logsManagement from '@/components/monitor/logsManagement'
import monitors from '@/components/monitor/monitor'
import offLinelogs from '@/components/monitor/offLinelogs'
import onLinelogs from '@/components/monitor/onLinelogs'
// import securityfrom '@/components/monitor/security'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '',
        redirect: 'login'
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/main',
        name: 'main',
        component: main
    }, {
        path: '/dcp',
        name: 'dcp',
        component: dcp,
        children: [{
            path: 'data',
            name: 'data',
            component: blackroute,
            redirect: { name: 'dataApply' },
            children: [{
                path: 'apply',
                name: 'dataApply',
                component: dataApply
            }, {
                path: 'review',
                name: 'dataReview',
                component: dataReview
            }, {
                path: 'audited',
                name: 'dataAudited',
                component: dataAudited
            }]
        }, {
            path: 'resource',
            name: 'resource',
            component: blackroute,
            redirect: { name: 'resourceApply' },
            children: [{
                path: 'apply',
                name: 'resourceApply',
                component: resourceApply
            }, {
                path: 'review',
                name: 'resourceReview',
                component: resourceReview
            }, {
                path: 'audited',
                name: 'resourceAudited',
                component: resourceAudited
            }, {
                path: 'catalog',
                name: 'catalog',
                component: catalog
            }, {
                path: 'release',
                name: 'release',
                component: release
            }, {
                path: 'applysubmit/:id',
                name: 'applysubmit',
                component: resourceApplySubmit
            }, {
                path: 'applyedit/:id',
                name: 'applyedit',
                component: resourceApplyEdit
            }, {
                path: 'applyFiles/:id',
                name: 'applyFiles',
                component: resourceApplyFiles
            }, {
                path: 'applyFilesAudit/:id',
                name: 'applyFilesAudit',
                component: resourceApplyFilesAudit
            }, {
                path: 'applytable/:id',
                name: 'applytable',
                component: resourceApplytable
            }, {
                path: 'applycheck/:batchId/:taskId/:isShow',
                name: 'applycheck',
                component: resourceApplyCheck
            }, {
                path: 'applycheckfile/:batchId/:taskId/:isShow',
                name: 'applycheckfile',
                component: resourceApplyCheckFile
            }]
        }, {
            path: 'serve',
            name: 'serve',
            component: blackroute,
            children: [{
                path: 'apply',
                name: 'apply',
                component: apply,
            }, {
                path: 'test',
                name: 'test',
                component: test,
            }, {
                path: 'review',
                name: 'serveReview',
                component: serveReview
            }, {
                path: 'audited',
                name: 'serveAudited',
                component: serveAudited
            }, {
                path: 'applied',
                name: 'serveApplied',
                component: applied
            }]
        }, {
            path: 'system',
            name: 'system',
            component: blackroute,
            redirect: { name: 'user' },
            children: [{
                path: 'user',
                name: 'user',
                component: user
            }, {
                path: 'department',
                name: 'department',
                component: department
            }, {
                path: 'organ',
                name: 'organ',
                component: organ
            }, {
                path: 'region',
                name: 'region',
                component: region
            }, {
                path: 'tag',
                name: 'tag',
                component: tag
            }]
        }, {
            path: 'monitor',
            name: 'monitor',
            component: blackroute,
            redirect: { name: 'node' },
            children: [{
                path: 'node',
                name: 'node',
                component: node
            }, {
                path: 'nodedetails/:ip',
                name: 'nodedetails',
                component: nodedetails
            }, {
                path: 'serviceManager',
                name: 'serviceManager',
                component: serviceManager
            }, {
                path: 'servicedetails/:ip',
                name: 'servicedetails',
                component: servicedetails
            }, {
                path: 'virtualNode',
                name: 'virtualNode',
                component: virtualNode
            }, {
                path: 'virtualNodelookup/:node/:flag/:fatherip',
                name: 'virtualNodelookup',
                component: virtualNodelookup
            }, {
                path: 'serviceDiscovery',
                name: 'serviceDiscovery',
                component: serviceDiscovery
            }, {
                path: 'configurationManagement',
                name: 'configurationManagement',
                component: configurationManagement
            }, {
                path: 'logsManagement',
                name: 'logsManagement',
                component: logsManagement
            }, {
                path: 'monitors',
                name: 'monitors',
                component: monitors
            }, {
                path: 'offLinelogs',
                name: 'offLinelogs',
                component: offLinelogs
            }, {
                path: 'onLinelogs/:pod',
                name: 'onLinelogs',
                component: onLinelogs
            }]
        }]
    }, {
        path: '/*',
        name: 'error',
        component: routeError
    }]
})
