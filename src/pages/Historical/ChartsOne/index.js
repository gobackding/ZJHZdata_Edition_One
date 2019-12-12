import React, { Fragment } from "react"
import G2 from '@antv/g2'
import connect from "./connect"
import insertCss from 'insert-css';

@connect
class ChartsOne extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <Fragment>
        <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '20px' }}>TOP 10规则</p>
        <div id="LSChartsOne"></div>
      </Fragment>
    )
  }
  componentDidMount() {
    let FromList = []
    let FromValue = this.props.CheckingUpCharts.jhjglsList
    if (this.props.CheckingUpCharts == 0) {
      for (var i = 0; i < 6; i++) {
        let obj = {}
        obj.type = '数据暂无' + i
        obj.value = 1
        FromList.push(obj)
      }
    } else {
      for (var i = 1; i < FromValue.length; i++) {
        if (FromValue[i].top10) {
          let obj = {}
          obj.type = FromValue[i].top10.key
          obj.value = FromValue[i].top10.value
          FromList.push(obj)
        }
      }
    }
    console.log(FromList, 'FromList')
    this.ChartsHandler(FromList)
  }
  ChartsHandler(Data) {
    let _this = this
    const data = [
      { type: '1-3秒', value: 0.16 },
      { type: '4-10秒', value: 0.125 },
      { type: '11-30秒', value: 0.24 },
      { type: '31-60秒', value: 0.19 },
      { type: '1-3分', value: 0.22 },
      { type: '3-10分', value: 0.05 },
      { type: '10-30分', value: 0.01 },
      { type: '30+分', value: 0.015 },
      { type: '30分', value: 0.8 }
    ];
    const chart = new G2.Chart({
      container: 'LSChartsOne',
      forceFit: true,
      height: 500,
      padding: [20, 20, 50, 40]
    });
    chart.source(Data);
    chart.guide().region({
      start: ['start', 'max'],
      end: ['end', 0.6],
      style: {
        lineWidth: 0,
        fill: '#dcdcdc',
        fillOpacity: 0.3,
        stroke: '#ccc'
      }
    });
    chart.guide().text({
      top: true,
      position: ['end', 'max'],
      content: '达标区间',
      style: {
        fill: '#aaaaaa',
        textAlign: 'end',
        textBaseline: 'top',
        fontWeight: 300
      },
      offsetX: -10,
      offsetY: 6
    });
    chart.axis('type', {
      tickLine: {
        alignWithLabel: false,
        length: 0
      }
    });
    chart.axis('value', {
      label: {
        formatter: val => {
          return String(parseFloat(val * 100)) + '%';
        }
      }
    });
    chart.legend(false);
    chart.interval().position('type*value').opacity(1)
      .label('value', {
        formatter: text => {
          const val = parseFloat(text);
            return (val * 100).toFixed(1) + '%';
        },
        offset: 10
      });

    chart.render();

    chart.on('dblclick', _this.ChartAddClick.bind(this))


  }
  ChartAddClick(e) {
    if (!e.data) return;
    console.log(this)
    this.props.TableChartsOne(e.data.point)
    console.log(e.data.point)
  }
}
export default ChartsOne