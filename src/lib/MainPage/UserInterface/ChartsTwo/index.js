import React, { Fragment } from "react";
import G2 from '@antv/g2'
import { CHARTSLISTVALUE } from "@api/UserInterface"
class ChartsTwo extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <Fragment>
                <p style={{ fontSize: '16px', textAlign: 'center', margin: '10px 0' }}>历史检核规则失败TOP 10</p>
                <div id="ChartsTwo"></div>
            </Fragment>
        )
    }
    async componentDidMount() {
        let parsetint;
        let Array = []
        let ArrayId = []
        let data = await CHARTSLISTVALUE()

        if (!data.data) {
            for (var i = 0; i < 6; i++) {
                let obj = {}
                obj.year = '数据暂无' + i
                obj.num = 1
                Array.push(obj)
            }
            parsetint = 1
        } else {
            let ChartsListValue = data.data[0].checkTimesHistory
            console.log(data.data[0].checkTimesHistory)
            for (var i = 0; i < ChartsListValue.length; i++) {
                let obj = {}
                obj.year = ChartsListValue[i].rule_seq
                obj.num = ChartsListValue[i].sumSfsjzl
                ArrayId.push(ChartsListValue[i].sumSfsjzl)
                Array.push(obj)
            }
            ArrayId = ArrayId.sort(function (a, b) {
                return b - a
            })
            parsetint = Math.ceil(ArrayId[0] / 5)
        }

        const chart = new G2.Chart({
            container: 'ChartsTwo',
            forceFit: true,
            height: 400,
            padding: [20, 55, 50, 40]
        });
        chart.source(Array);
        chart.scale('num', {
            alias: '失范数量'
          });
        
        chart.interval().position('year*num');
        chart.render();
    }
}
export default ChartsTwo