<template>
  <div>
    <h2>{{ circleRange }}km 이내의 업체</h2>
    <div id="map" />
    <span style="display : none;">
      {{ getSeletedUser }}
    </span>
  </div>
</template>
<script>

import {mapGetters,mapState} from "vuex"
export default {
  computed : {
    ...mapGetters('selectedUser',['getSeletedUser']),
    ...mapState('selectedUser',['circleRange'])
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=31da5401f6ff3888e0ebd955885faaf3&libraries=clusterer,services";
      document.head.appendChild(script);
    }
  },
  updated() {
    document.getElementById('map').innerHTML = "";
    this.initMap()
  },
  methods: {
    async initMap() {
      const latLng = new kakao.maps.LatLng(this.getSeletedUser.lat, this.getSeletedUser.lng)
      const container = document.getElementById("map");
      const options = {
            center: latLng,
            level: 11,
        };
      const map = new kakao.maps.Map(container, options)
      new kakao.maps.Marker({
                position :latLng,
                title : this.getSeletedUser.siteName ,
                map,
            });
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 10 // 클러스터 할 최소 지도 레벨
    });
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var markers = this.getSeletedUser.siteList.map(function(i) {
            return new kakao.maps.Marker({
                image : markerImage,
                title : `${i.SITE_NAME} ${String(i.DIST).slice(0,4)}km 떨어져 있음`,
                position : new kakao.maps.LatLng(i.LAT, i.LNG)
            });
        });
    clusterer.addMarkers(markers);
    }
  }
}
</script>
<style scoped>
#map {
  width:100%;
  height:350px;
}
</style>
