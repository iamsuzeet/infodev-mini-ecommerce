export enum RequestMethod {
    GET = "GET",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    PURGE = "PURGE",
    LINK = "LINK",
    UNLINK = "UNLINK"
}

export enum RequestBodyType {
    /**If request id in application/x-www-form-urlencoded as string*/
    QUERYSTRING = "QUERY-STRING",
    /**If request is in formdata*/
    FORMDATA = "FORM-DATA",
    /**If request requires Bearer*/
    AUTH = "AUTH",
    /**If request is open*/
    NOAUTH = "NO-AUTH"
}

/**
 * API detail with redux action associated with it
 */
export interface apiDetailType {
    /**Redux Action Name */
    actionName: string;
    /**Request API URI */
    controllerName: string;
    /**Request Method; Defaults as GET */
    requestMethod?: RequestMethod
    /**Request Body Type */
    requestBodyType?: RequestBodyType;
};


const apiDetails = {
    local: {
        i18n: {
            controllerName: "",
            actionName: "I18N"
        },
    },
    oauth: {
        login: {
            controllerName: "/login",
            actionName: "LOGIN",
            requestMethod: RequestMethod.POST,
            requestBodyType: RequestBodyType.AUTH
        },
        init: {
            controllerName: "/oauth/user/init/data",
            actionName: "INIT",
            requestMethod: RequestMethod.GET
        }
    },
    public: {
        register: {
            controllerName: "/external/public/user/registration",
            actionName: "REGISTER",
            requestMethod: RequestMethod.POST,
            requestBodyType: RequestBodyType.NOAUTH
        }
    },
    external: {
        masterdata: {
            docTypeListForImporterRegistration: {
                controllerName: "/external/masterdata/doctype/list/for/importerregistration",
                actionName: "DOC_TYPE_LIST_IMPORTER_REGISTRATION",
                requestMethod: RequestMethod.GET
            },
            getDistrictList: {
                controllerName: "/external/masterdata/district/list",
                actionName: "GET_DISTRICT_LIST",
                requestMethod: RequestMethod.GET
            },
            getLocalBodyByDistrictId: {
                controllerName: "/external/masterdata/local-body/by-district?districtId={districtId}",
                actionName: "GET_LOCALBODY_BY_DISTRICT_ID",
                requestMethod: RequestMethod.GET
            }
        },
        profileSetup: {
            controllerName: "/external/public/user/profile/setup",
            actionName: "PROFILE_SETUP",
            requestMethod: RequestMethod.POST,
            requestBodyType: RequestBodyType.FORMDATA
        },
        importerDetails: {
            controllerName: "/external/public/user/profile/view",
            actionName: "IMPORTER_DETAILS",
            requestMethod: RequestMethod.GET,
        }
    },
    internal: {
        approvalPendingList: {
            controllerName: "/internal/approval/user/list?usertype=importer",
            actionName: "APPROVAL-PENDING-LIST",
            requestMethod: RequestMethod.GET,
        },
        importerDetails: {
            // controllerName: "/internal/approval/user/detail?publicuserid={reqData}",
            controllerName: "/internal/approval/user/detail",
            actionName: "APPROVAL-DETAILS",
            requestMethod: RequestMethod.GET,
        },
        zonalSetup: {
            getAllProvince: {
                controllerName: "/internal/province/list",
                actionName: "GET_ALL_PROVINCE",
                requestMethod: RequestMethod.GET
            },
            getAllLocalBody: {
                controllerName: "/internal/local-body/list",
                actionName: "GET_ALL_LOCAL_BODY",
                requestMethod: RequestMethod.GET
            },
            getDistrictByProvinceId: {
                controllerName: "/internal/district/by-province?provinceId={provinceId}",
                actionName: "GET_DISTRICT_BY_PROVINCE_ID",
                requestMethod: RequestMethod.GET
            },
            // getLocalBodyByDistrictId: {
            //     controllerName: "/internal/local-body/by-district?districtId={districtId}",
            //     actionName: "GET_LOCALBODY_BY_DISTRICT_ID",
            //     requestMethod: RequestMethod.GET
            // }
        }
    },
    shopping: {
        getAllProduct: {
            controllerName: "/product",
            actionName: "GET_ALL_PRODUCT",
            requestMethod: RequestMethod.GET
        }
    }

}

type ApiList = typeof apiDetails;
export const apiList: ApiList = apiDetails;