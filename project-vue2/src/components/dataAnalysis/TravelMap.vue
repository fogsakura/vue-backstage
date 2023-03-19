<template>
  <div class="travel-view">
    <div id="main"></div>
  </div>
</template>
<script>
import geojson from "@/assets/data.json";
import { travel } from "@/api/api.js";
export default {
  data() {
    return {};
  },
  created() {
    travel().then((res) => {
      if (res.data.status === 200) {
        let { points, linesData } = res.data.data;
        this.draw(points, linesData);
      }
    });
  },
  methods: {
    draw(points, linesData) {
      let myChart = this.$echarts.init(document.getElementById("main"));
      this.$echarts.registerMap("china", geojson);
      let option = {
        backgroundColor: "rgb(121, 145, 209)",
        geo: {
          map: "china",
          label: {
            normal: {
              show: true,
              text: "",
            },
          },
          aspectScale: 0.75,
          zoom: 1.1,
          itemStyle: {
            normal: {
              areaColor: {
                type: `radial`,
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "#09132c",
                  },
                  {
                    offset: 1,
                    color: "#274d68",
                  },
                ],
                globalCoord: true,
              },
              shadowColor: "rgb(58,115,192)",
              shadowOffsetX: 10,
              shadowOffsetY: 11,
            },
          },
          regions: [
            {
              name: "海南诸岛",
              itemStyle: {
                opacity: 0,
              },
            },
          ],
        },
        series: [
          {
            type: "map",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#1DE986",
                },
              },
              emphasis: {
                textStyle: {
                  color: "rgb(183, 185, 14)",
                },
              },
            },
            zoom: 1.1,
            map: "china",
            itemStyle: {
              normal: {
                backgroundColor: "rgb(17, 235, 248)",
                borderWidth: 1,
                areaColor: {
                  type: `radial`,
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgb(31, 54, 150)",
                    },
                    {
                      offset: 1,
                      color: "rgb(89, 128, 142)",
                    },
                  ],
                  globalCoord: true,
                },
              },
              emphasis: {
                areaColor: "rgb(46,229,206)",
                borderWidth: 0.1,
              },
            },
          },
          //   关于地图中散点图的配置
          {
            type: "effectScatter", //  散点图
            coordinateSystem: "geo",
            showEffectionOn: "render",
            symbolSize: 10, // 散点大小
            zlevel: 1,
            data: points,
            rippleEffect: {
              // 涟漪特效相关配置
              period: 15,
              scale: 4,
              brushType: "fill",
            },
          },
          //   关于地图的中线图的配置
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4,
              symbol: "arrow",
              symbolSize: 7,
              trailLength: 0.4,
            },
            lineStyle: {
              normal: {
                color: "#1DE986",
                width: 1,
                opacity: 0.1,
                curveness: 0.3,
              },
            },
            data: linesData,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss">
.travel-view {
  width: 100%;
  #main {
    width: 100%;
    height: 500px;
  }
}
</style>
