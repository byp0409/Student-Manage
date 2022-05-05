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
          radar(id) {
            var chartDom = document.getElementById(id);
            var myChart = echarts.init(chartDom);
            var option;

            option = {
              title: {
                text: '知识点掌握情况',
              },
              legend: {
                // 名字
                data: ['Allocated Budget'],
              },
              radar: {
                // shape: 'circle',
                // 类目名
                indicator: [
                  { name: 'Sales', max: 5 },
                  { name: 'Administration', max: 5 },
                  { name: 'Information Technology', max: 5 },
                  { name: 'Customer Support', max: 5 },
                  { name: 'Development', max: 5 },
                  { name: 'Marketing', max: 5 },
                ],
              },
              series: [
                {
                  name: 'Budget vs spending',
                  type: 'radar',
                  // 分数
                  data: [
                    {
                      value: [5, 5, 5, 5, 5, 5],
                      name: 'Allocated Budget',
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
