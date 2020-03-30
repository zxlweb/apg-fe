interface ensureCallback {
    (require: NodeRequire): void
}
interface NodeRequire {
    ensure(dep: Array<string>, callback: ensureCallback): void
}

interface Window {
    _http: REQUEST,
    _https: REQUEST,
    _storage: STORAGE,
    ret: RET,
    _wechatSDKSetup: Function,
    mozRequestAnimationFrame: any
}

declare const __WEBPACK_DEV__: boolean;

declare const _importLess: ImportLess;
declare const _http: REQUEST;
declare const _https: REQUEST;
declare const ret: RET;
declare const _storage: STORAGE;

declare const wx: any;
declare const _wechatSDKSetup: Function;
declare const zhuge: any;

declare const __INITIAL_STATE__: string;
declare const __INITED_FLAG__: string;

declare const device_mobile: boolean;
declare const device_phone: boolean;
declare const device_tablet: boolean;
declare const device_os: string;

declare const __CROSSDOMAIN__: string;
declare const __DIST_PATH__: string;
declare const __PORT__: string;
declare const __APP__: string;
declare const __STUB_SERVER_FILE_DIR__: string;
declare const __JS_LIB_PATH__: string;
declare const __JS_STATIC_PATH__: string;
declare const __IMAGE_STATIC_PATH__: string;
declare const __STYLE_STATIC_PATH__: string;
declare const __RETINA_DEFAULT_RATIO__: string;
declare const __API_SERVER_FETCH_HOSTNAME__: string;
declare const __API_SERVER_FETCH_PORT__: string;
declare const __STUB_SERVER_FETCH_HOSTNAME__: string;
declare const __STUB_SERVER_FETCH_PORT__: string;
declare const __API_SERVER_HTTP_HOSTNAME__: string;
declare const __API_SERVER_HTTP_PORT__: string;
declare const __STUB_SERVER_HTTP_HOSTNAME__: string;
declare const __STUB_SERVER_HTTP_PORT__: string;
declare const __PAGE_SERVER_HOST__: string;
declare const __PAGE_SERVER_PORT__: string;