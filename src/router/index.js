import { Home, Login, Sign, ClassfyList, Supervise, Administration, CheckingUp, FileManagement, SBAdministration, Historical } from "@pages/index.js"
import { JHLSFX,SubmitReport } from "@components/index"

import { XTGLPage, DataChecking,UserInterface ,UserChoice} from "@lib/MainPage"
export const PagesComponent = [
    {
        key: "/Login",
        path: "/Login",
        component: Login,
        icon: "",
        name: "Login",
        meta: {
            flag: true
        }
    },
    {
        key: "/Sign",
        path: "/Sign",
        component: Sign,
        icon: "",
        name: "Sign",
        meta: {
            flag: true
        }
    }
]
export const layoutRoute = [
    {
        key: "/UserInterface",
        path: "/UserInterface",
        class:'UserInterface',
        component: UserInterface,
        icon: "folder-open",
        name: "用户界面",
        meta: {
            flag: true
        }
    },
    {
        key: "/UserChoice",
        path: "/UserChoice",
        class:'UserChoice',
        component: UserChoice,
        icon: "folder-open",
        name: "用户选择",
        meta: {
            flag: true
        }
    },
    {
        key: "/DataChecking",
        path: "/DataChecking",
        class:'DataChecking',
        icon: "fund",
        name: "数据检核",
        component: DataChecking,
        children: [
            {
                key: "/DataChecking/FileManagement",
                path: "/DataChecking/FileManagement",
                class:'FileManagement',
                component: FileManagement,
                icon: "folder-open",
                name: "文件检核",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/ClassfyList",
                path: "/DataChecking/ClassfyList",
                class:'ClassfyList',
                component: ClassfyList,
                icon: "hdd",
                name: "数据检核",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/JHLSFX",
                path: "/DataChecking/JHLSFX",
                class:'JHLSFX',
                component: JHLSFX,
                icon: "pie-chart",
                name: "检核报告",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/SubmitReport",
                path: "/DataChecking/SubmitReport",
                class:'SubmitReport',
                component: SubmitReport,
                icon: "pie-chart",
                name: "生成上报",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/Historical",
                path: "/DataChecking/Historical",
                class:'Historical',
                component: Historical,
                icon: "pie-chart",
                name: "检核结果",
                meta: {
                    flag: true
                }
            },
            {
                key: "/DataChecking/CheckingUp",
                path: "/DataChecking/CheckingUp",
                class:'CheckingUp',
                component: CheckingUp,
                icon: "copy",
                name: "检核状态",
                meta: {
                    flag: true
                }
            }
        ]
    },
    {
        key: "/XTGLPage",
        path: "/XTGLPage",
        class:'XTGLPage',
        icon: "fund",
        name: "系统管理",
        component: XTGLPage,
        children: [
            
            {
                key: "/XTGLPage/Administration",
                path: "/XTGLPage/Administration",
                class:'Administration',
                component: Administration,
                icon: "setting",
                name: "用户管理",
                meta: {
                    flag: true
                }
            },
            {
                key: "/XTGLPage/Home",
                path: "/XTGLPage/Home",
                class:'Home',
                icon: "fund",
                name: "规则管理",
                component: Home
            },
        ]
    },
    {
        key: "/SBAdministration",
        path: "/SBAdministration",
        class:'SBAdministration',
        component: SBAdministration,
        icon: "pie-chart",
        name: "上报管理",
        meta: {
            flag: true
        }
    },
    
]


export const EachWhole = PagesComponent.concat(layoutRoute)