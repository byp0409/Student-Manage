import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $Chart: {
      get() {
        return {
          radar(id, Sname, Scase, Scase1) {
            // 整理数据
            // 知识点名字  实现根据知识点个数动态渲染
            let kname = Scase.split('|');
            let indicator = [];
            kname.forEach(item => {
              // 对象要定义在里面，这样每次循环的对象都是新地址(一个全新的对象) ，定义在外面的话地址不变，导致数组中存放的数据都是都是最后一个
              let temp = { name: '', max: 5 };
              temp.name = item;
              indicator.push(temp);
            });
            // 数值
            let temp1 = Scase1.split('|').filter(item => item);
            let value = [];
            temp1.forEach(item => {
              value.push(item.split(':')[1]);
            });
            /*  */
            var chartDom = document.getElementById(id);
            var myChart = echarts.init(chartDom);
            var option;

            option = {
              title: {
                text: '知识点掌握情况',
              },
              legend: {
                // 名字
                data: [`${Sname}`],
              },
              radar: {
                // shape: 'circle',
                // 类目名  简写
                indicator,
                splitArea: {
                  areaStyle: {
                    // 雷达图背景颜色  四层，一会个性化设置一下
                    color: ['#fefefe', '#f6f8fc', '#fefefe', '#f6f8fc', '#fefefe'],
                  },
                },
                // 雷达图外部文字描述样式
                axisName: {
                  color: '#333',

                  fontSize: '15px',
                },
              },
              series: [
                {
                  // 名字
                  name: Sname,
                  type: 'radar',
                  // 线条高亮
                  emphasis: {
                    lineStyle: {
                      width: 4,
                    },
                  },
                  // 雷达图上显示具体值
                  label: {
                    normal: {
                      show: true,
                      fontSize: '15px',
                      formatter: function (params) {
                        return params.value;
                      },
                    },
                  },
                  // 分数
                  data: [
                    {
                      value,
                      name: Sname,
                      areaStyle: {
                        // 雷达图面积内的颜色
                        color: 'rgba(255, 228, 52, 0.6)',
                      },
                    },
                  ],
                },
              ],
            };
            option && myChart.setOption(option);
          },
        };
      },
    },
  });
};

export default install;
