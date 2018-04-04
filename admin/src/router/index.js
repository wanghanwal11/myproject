import Vue from 'vue'
import Router from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(Router)
Vue.use(VueQuillEditor)
const load = (...p)=>resolve => require([`@/${p[1]||'page'}/${p[0]}.vue`], resolve);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'NewLogin',
      component: load('NewLogin')
    },{
      path: '/yunLogin',
      component: load('yunLogin'),
      name: 'yunLogin'
    },{
       path: '/NewLogin',
       component: load('NewLogin'),
       name: 'NewLogin'
     },{
      path: '/demo',
      component: load('demo'),
      name: 'demo'
    },{
       path: '/demo2',
       component: load('demo2'),
       name: 'demo2'
    },{
      path: '/Register',
      component: load('Register'),
      name: 'Register'
    },{
      path: '/bindPhone',
      component: load('bindPhone'),
      name: 'bindPhone'
    },{
      path: '/tag',
      component: load('tag','components'),
      name: 'tag'
    },{
      path: '/drag',
      component: load('drag','components'),
      name: 'drag'
    },
    {
      path: '/admin',
      component: load('Admin'),
      children: [
      {
        path: '/websocket',
        component: load('websocket'),
        meta: {auth: true, title: "活动添加"}
      },{
        path: '/huodongbj',
        component: load('huodongbj'),
        meta: {auth: true, title: "活动添加"}
      },{
        path: '/noticmodal',
        component: load('noticmodal'),
        meta: {auth: true, title: "文章添加"}
      },{
        path: '/conversation',
        component: load('conversation'),
        meta: {auth: true, title: "文章添加"},
        children: [
            {
              path: '/conversations',
              component: load('conversations'),
              meta: {auth: true, title: "会话"}
            }
        ]
      },{
        path: '/bjnotic',
        component: load('bjnotic')
      },{
        path: '/noticlishi',
        component: load('noticlishi')
      },{
        path: '/Test',
        component: load('test'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/AppealInfo',
        component: load('appealInfo'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/AppealManagement',
        component: load('appealManagement'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/AppealManagementTwo',
        component: load('appealManagementTwo'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/AppealCompletion',
        component: load('appealCompletion'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/Noticeofappeal',
        component: load('noticeofappeal'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/development',
        component: load('development'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/knowledgeBase',
        component: load('knowledgeBase'),
        meta: {auth: true, title: "欢迎"}
      },
      {
        path: '/library',
        component: load('library'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/TestMap',
        component: load('testMap'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/Register',
        component: load('Register'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/OrderList',
        component: load('orderList'),
        meta: {auth: true, title: "订单管理"}
      },{
          path: '/activity',
          component: load('activity'),
          meta: {auth: true, title: "活动"},
          children: [
            {
              path: '/activityCount',
              component: load('activityCount'),
              name: 'activityCount',
              meta: {auth: true, title: "活动统计"}
            },
            {
              path: '/activityList',
              component: load('activityList'),
              meta: {auth: true, title: "活动发布"}
            },
            {
              path: '/activityDraft',
              component: load('activityDraft'),
              meta: {auth: true, title: "活动草稿"}
            }
          ]
        },{
          path: '/xyDetails',
          component: load('xyDetails'),
          meta: {auth: true, title: "活动"},
          children: [
            {
              path: '/activityDetails',
              component: load('activityDetails'),
              meta: {auth: true, title: "活动详情"}
            },
            {
              path: '/activityPreview',
              component: load('activityPreview'),
              meta: {auth: true, title: "活动预览"}
            }
          ]
      },{
          path: '/article',
          component: load('article'),
          meta: {auth: true, title: "图文"},
          children: [
            {
              path: '/articleSearch',
              component: load('articleSearch'),
              meta: {auth: true, title: "11",keep: true}
            },
            {
              path: '/articleList',
              component: load('articleList'),
              meta: {auth: true, title: "11"}
            },
            {
              path: '/articleSendAndHistory',
              component: load('articleSend'),
              meta: {auth: true, title: "欢迎"},
              children: [
                {
                  path: '/articleSend',
                  component: load('sendHistory'),
                  meta: {auth: true, title: "11"}
                }
              ]
            }
          ]
        },{
          path: '/articleInfo',
          component: load('articleInfo'),
          meta: {auth: true, title: "图文"},
          children: [
            {
              path: '/articleDetail',
              component: load('articleDetail'),
              meta: {auth: true, title: "文章详情"}
            },
            {
              path: '/articleLocalPreview',
              component: load('articleLocalPreview'),
              meta: {auth: true, title: "11"}
            }
          ]
        },{
          path: '/send',
          component: load('send'),
          meta: {auth: true, title: "图文"},
          children: [

          ]
        },{
          path: '/articlePreview',
          name: 'articlePreview',
          component: load('articlePreview'),
          meta: {auth: true, title: "欢迎"}
        },{
          path: '/kong2',
          component: load('Kong2'),
          meta: {auth: true, title: "11"}
        },{
          path: '/toupiaotj',
          component: load('toupiao'),
          meta: {auth: true, title: "11"}
        },{
        path: '/List',
        component: load('List'),
        meta: {auth: true, title: "欢迎",keep:true}
      },{
        path: '/EnterpriseLists',
        component: load('enterpriseLists'),
        meta: {auth: true, title: "企业管理",keep:true}
      },{
        path: '/PeopleList',
        component: load('peopleList'),
        meta: {auth: true, title: "人员管理"}
      },{
          path: '/peopleInfo',
          component: load('peopleInfo'),
          meta: {auth: true, title: "社工详情"}
        },{
        path: '/CitizenList',
        component: load('citizenList'),
        meta: {auth: true, title: "市民管理"}
      },{
          path: '/citizenInfo',
          component: load('citizenInfo'),
          meta: {auth: true, title: "市民详情"}
        },{
        path: '/DropList',
        component: load('dropList'),
        meta: {auth: true, title: "微信管理"}
      },{
        path: '/Personal',
        component: load('personal'),
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/CommunityInfo',
        component: load('communityInfo'),
        meta: {auth: true, title: "社区信息"},
        children: [
          {
            path: '/commInfo',
            component: load('commInfo'),
            meta: {auth: true, title: "11"}
          },
          {
            path: '/commServerList',
            component: load('commServerList'),
            meta: {auth: true, title: "11"}
          },
          {
            path: '/settings',
            component: load('settings'),
            meta: {auth: true, title: "11"}
          }
        ]
      },{
        path: '/Community',
        component: load('community'),
        meta: {auth: true, title: "社区信息"}
      },{
        path: '/QuillEditor',
        component: load('quillEditor'),
        meta: {auth: true, title: "文章发送"}
      },{
        path: '/TypeList ',
        component: load('typeList','components') ,
        meta: {auth: true, title: "欢迎"}
      },{
        path: '/VolunteerInfo',
        component: load('volunteerInfo'),
        name: 'VolunteerInfo'
      },{
        path: '/VolunteerInfos',
        component: load('VolunteerInfos'),
        name: 'VolunteerInfos'
      },{
        path: '/orderListM',
        component: load('orderListM'),
        name: 'orderListM',
        meta: {auth: true, title: "订单",keep:true}
      },{
        path: '/activePreview',
        component: load('activePreview'),
        name: 'activePreview',
        meta: {auth: true, title: "订单",keep:true}
      },{
          path: '/ServiceOrderList',
          component: load('serviceOrderList'),
          name: 'ServiceOrderList',
          meta: {auth: true, title: "订单",keep:true}
        },{
        path: '/EntryOrder',
        component: load('entryOrder'),
        name: 'EntryOrder'
      },
        // {
        //   path: '/toupiaoxq',
        //   component: load('toupiaoxq'),
        //   name: 'toupiaoxq'
        // },
        {
          path: '/toupiaolb',
          component: load('toupiaolb'),
          name: 'toupiaolb'
        },{
          path: '/toupiaoyl',
          component: load('toupiaoyl'),
          name: 'toupiaoyl'
        },
        //{
        //   path: '/toupiaoyl',
        //   component: load('toupiaoyl'),
        //   name: 'toupiaoyl'
        // }

        {
          path: '/toupiaoZi',
          component: load('toupiaoZi'),
          meta: {auth: true, title: "投票"},
          children: [
            {
              path: '/toupiaoxq',
              component: load('toupiaoxq'),
              meta: {auth: true, title: "投票"}
            },
            {
              path: '/toupiaoyl',
              component: load('toupiaoyl'),
              meta: {auth: true, title: "预览"}
            }
          ]
        }

      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default router
