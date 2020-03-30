/**
 * @fileOverview single page
 * @author Max
 */

import * as React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'razy/dist/lib/base-component';
import HTMLManager from 'razy/dist/lib/html-manager';
import createSelector from 'razy/dist/lib/immu-reselect';
import * as _expressStatic from 'express-serve-static-core';
import * as spActions from '../../a-action/sp';
import { DataStructure } from '../../a-reducer/sp';
import { GRADE_COLOR } from '../../const';
import { link } from 'fs';

const style = _importLess('./index', __dirname);
class SinglePage extends BaseComponent<{
    data: DataStructure[]
}, {}> {
    async interceptor(req: _expressStatic.Request, res: _expressStatic.Response, next: _expressStatic.NextFunction): Promise<any> { }
    setUpPage(manager: HTMLManager, datas: any[]) { }
    getInitDataActionImp(props: any) {
        // return [spActions.getChunk({ teamName: "乘风破浪队" })]
    }
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { dispatch } = this.props;
        let { teamName } = this.props.location.query
        console.log(teamName)
        let peopleName = ["胡健",
            "郭洋洋",
            "戴晓兰",
            "鲍静",
            "胡壮壮",
            "杨敏",
            "严昊",
            "浦江",
            "何紫玲",
            "戴静",
            "徐磊",
            "王丹",
            "谢云琦",
            "段德权",
            "蔡亚涛",
            "胡伟",
            "温昱",
            "彭静",
            "韩瑞霞",
            "陈曹君一",
            "王娟",
            "史肖肖",
            "魏振浩",
            "朱亚菲",
            "宫雪",
            "姜晓曼",
            "苟源",
            "张兰天",
            "焦彤",
            "章丽",
            "丁阳",
            "陶凯成",
            "程鹏力",
            "陈晶鑫",
            "安丽云",
            "王燕",
            "苗硕",
            "萨楚拉",
            "郭子豪",
            "钱晶",
            "刘慧",
            "李米乐",
            "张相如",
            "秦艳",
            "夏宇",
            "蒋天睿",
            "江欢欢",
            "凌成",
            "周雪冬",
            "张凯",
            "殷岚",
            "王海东",
            "胡洋",
            "刘娜",
            "宋延虎",
            "刘思雨",
            "郭闯",
            "张伟伟",
            "张洁",
            "戈颂",
            "乔梅林",
            "梅立飞",
            "安娜",
            "龚方玲",
            "叶朦",
            "李娜",
            "李称心",
            "李影",
            "程洁",
            "薛洁",
            "赵淑璇",
            "朱虎",
            "钱双旭",
            "陈立慧",
            "李雪",
            "郭文婷"
        ]
        // dispatch(spActions.getChunk({
        //     teamName: "乘风破浪队"
        // })).then()
    }
    //猪猪萌萌队  旺旺队  超能战队   我们都队   金陵雄师队  稳赢不输队  霸气威5队  Super teachers!   无与伦比队  阳光先锋队  
    // 美队  先声夺人队  颜值爆表队   初二全都队  9个美女与11野兽  回家的诱惑队   有机会吗  说好不哭队   天才队 大力水手队  
    // 哔哔赖赖队  齐天大胜  姑苏云梦  天使队  新年快乐队  百因必有果队  全南京最棒队  祖国花朵队  冲锋舟队  对对队
    // 你说的队  四带二队  奥林匹克队   雄姿英化队   全场最美队   秋日物语队

    render() {
        const { data } = this.props;
        let { from } = this.props.location.query;

        console.log(this.props, 'data this.props')
        var peopleName = ["龚方玲",
            "叶朦",
            "李娜",
            "李称心",
            "李影",
            "程洁",
            "薛洁",
            "赵淑璇",
            "朱虎",
            "钱双旭",
            "陈立慧",
            "李雪",
            "郭文婷"


        ]

        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: style }}></style>
                <div id="page-single">
                    <div className="bg" >
                        <ul>
                            <li className="team-li" >
                                <p className="team-name">{peopleName[from]}</p>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state: any) => state.sp.get('data'),
    (data: any) => ({
        data: data.toJS()
    })
);

export = connect(selector)(SinglePage); 