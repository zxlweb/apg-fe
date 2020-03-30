/**
 * @fileOverview Root组件
 * @author Max
 **/

import * as _expressStatic from 'express-serve-static-core';
import * as React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'razy/dist/lib/base-component';
import HTMLManager from 'razy/dist/lib/html-manager';
import * as moment from 'moment';
import { envDetect } from 'razy/dist/lib/env-detect';
// set up moment
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const style = _importLess('./root', __dirname);
class Root extends BaseComponent<any, any> {
    async interceptor(req: _expressStatic.Request, res: _expressStatic.Response, next: _expressStatic.NextFunction): Promise<any> { }
    setUpPage(manager: HTMLManager) {
        manager.setTag('title', '纪念册生成器');
        manager.prependTagBefore('headTagClose', 'globalStyle', { href: __STYLE_STATIC_PATH__ + '/global.css' }, manager.TAG_TYPE.STYLE);
        manager.prependTagBefore('headTagClose', 'resetStyle', { href: __STYLE_STATIC_PATH__ + '/reset.css' }, manager.TAG_TYPE.STYLE);
    }
    getInitDataActionImp(props: any) { }
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        super.componentDidMount();
        console.log('root did mount');
    }
    render() {
        let debugPanel: any;
        if (this.state.client) {
            if (this.props.devTools) {
                let DevTools = this.props.devTools;
                debugPanel =
                    <div>
                        <DevTools />
                    </div>;
            }
        }

        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: style }}></style>
                <div id="root-container">
                    {this.props.children}
                    {debugPanel}
                </div>
            </div>
        );
    }
}

const selector = () => ({});

export = connect(selector)(Root);