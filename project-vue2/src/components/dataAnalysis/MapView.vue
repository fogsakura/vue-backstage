<template>
  <div class="map-view">
    <div id="main"></div>
  </div>
</template>
<script>
import geojson from "@/assets/data.json";
export default {
  data() {
    return {};
  },
  mounted() {
    let myChart = this.$echarts.init(document.getElementById("main"));
    this.$echarts.registerMap("china", geojson);
    let option = {
      backgroundColor: "rgb(121, 145, 209)",
      geo: {
        map: "china",
        label: {
            normal: {
                show: true,
                text:""
            }
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
            shadowColor:'rgb(58,115,192)',
            shadowOffsetX:10,
            shadowOffsetY:11
          },
        },
        regions: [
          {
            name: "海南诸岛",
            itemStyle:{
              opacity:0
            }
          },
        ],
      },
      series: [
        {
          type: "map",
          label:{
            normal:{
              show:true,
              textStyle:{
                color:'#1DE986'
              }
            },
            emphasis:{
              textStyle:{
                color:'rgb(183, 185, 14)'
              }
            }
          },
          zoom: 1.1,
          map: "china",
          itemStyle: {
            normal: {
            backgroundColor:'rgb(17, 235, 248)',
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
            emphasis:{
                areaColor:'rgb(46,229,206)',
                borderWidth:0.1
            }
          },
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>
<style lang="scss">
.map-view {
  width: 100%;
  #main {
    width: 100%;
    height: 500px;
  }
}
</style>
