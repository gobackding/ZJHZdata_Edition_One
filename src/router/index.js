import { Home, Login, Sign, ClassfyList, Supervise, Administration ,CheckingUp,FileManagement,SBAdministration,CE} from "@pages/index.js"
import { Exhibition, Import, LowerHair ,GenerateReport} from "@components/index"

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
        key: "/Home",
        path: "/Home",
        icon: "fund",
        name: "规则管理",
        component:Home
    },
    {
        key: "/FileManagement",
        path: "/FileManagement",
        component: FileManagement,
        icon: "folder-open",
        name: "文件管理",
        meta: {
            flag: true
        }
    },
    {
        key: "/ClassfyList",
        path: "/ClassfyList",
        component: ClassfyList,
        icon: "hdd",
        name: "数据检核",
        meta: {
            flag: true
        }
    },
    {
        key: "/SBAdministration",
        path: "/SBAdministration",
        component: SBAdministration,
        icon: "pie-chart",
        name: "上报管理",
        meta: {
            flag: true
        },
        // children:[
        //     {
        //         key: "/SBAdministration/GenerateReport",
        //         path: "/SBAdministration/GenerateReport",
        //         component: GenerateReport,
        //         icon: "pie-chart",
        //         name: "上报管理",
        //         meta: {
        //             flag: true
        //         }
        //     }
        // ]
    },
    {
        key: "/Supervise",
        path: "/Supervise",
        component: Supervise,
        icon: "pie-chart",
        name: "历史分析",
        meta: {
            flag: true
        }
    },
    {
        key: "/Administration",
        path: "/Administration",
        component: Administration,
        icon: "setting",
        name: "系统管理",
        meta: {
            flag: true
        }
    },
    {
        key: "/CheckingUp",
        path: "/CheckingUp",
        component: CheckingUp,
        icon: "copy",
        name: "检核状态",
        meta: {
            flag: true
        }
    }
]


export const EachWhole = PagesComponent.concat(layoutRoute)