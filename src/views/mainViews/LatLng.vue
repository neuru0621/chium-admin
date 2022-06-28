
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

<template lang="">
  <v-container
    fluid
  >
    <v-card class="pa-3">
      dashboard
    </v-card>
    <div id="map_div" />
    <div id="map_div2" />
    <div
      id="divResult"
      style="height:200px; padding-left:20px; overflow:auto;"
    />
  </v-container>
</template>
	<script>
      export default {
        data(){
          return {
            DrawLine : {
              CNT_BUFF : 10,
              SPLIT_VALUE : 20,
              REQ_LIMIT_PER_SEC : 1,
              map  :null,
              map2:null,
              vectorLayer:null,
              vectorLayer2:null,
              arrPoint: [],
              totDistance : null,
              totPointCount : null,
              arrMatchedId : [],
              currentIndex : 0,
              startSourceIndex : 0,
              cntReqApi : 0,
              lastMatchedLocation : null,
              vector_layer : null,
              markerLayer : null,
              marker : null,
            },
            cnt : 0
          }
        },
        computed : {
          gogo(){
            return this.DrawLine.arrPoint
          }
        },
        watch :{
          gogo(){
            console.log('dp')
              this.cnt++
              if(this.cnt == 10){
                this.splitPoint();
                this.cnt = 0
              }
               // 포인트 데이터 나눠서 요청하기 ( LoadApi 한번에 요청 가능한 개수 100개 제한 )

            // 포인트에 따른 지도 바운드 설정
          }
        },
        created(){
          // setInterval(() => {
          //   this.getUserLocation()
          // }, 4000);
          if( this.isValidate() ) {
            // 유효성 검사를 통과 했다면 할 작업
            setTimeout(()=>{ // 지도를 띄우고 API 를 호출하기 위해 딜레이 줌
              this.splitPoint();
            }, 1000);
          }
        },
        mounted(){
          this.initMap(); // 지도 그리기

        },
        methods : {
          success({coords}){
            const lat = coords.latitude;
            const lng = coords.longitude;
            console.log(lng,'lng')
            console.log(lat,'lat')
            console.log(this.cnt)
            this.DrawLine.arrPoint.push(lng)
            this.DrawLine.arrPoint.push(lat)

            },
          getUserLocation() {
              if (!window.navigator.geolocation) {
                  alert( "위치 정보가 지원되지 않습니다.");
              }
              window.navigator.geolocation.getCurrentPosition(this.success,(err)=>{
                console.log(err)
              },{
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: Infinity

              });
          },
          isValidate(){
            console.log(this.DrawLine.arrPoint.length,'어레이 포인트 갯수')
            console.log(this.DrawLine.CNT_BUFF*2,'버퍼 개수')
            // if( this.DrawLine.arrPoint.length <= (this.DrawLine.CNT_BUFF*2) || this.DrawLine.SPLIT_VALUE <= this.DrawLine.CNT_BUFF || this.DrawLine.SPLIT_VALUE > 100 ) {
            //   alert("리소스 포인트 데이터 개수는 버퍼크기 초과여야 하고, \'DrawLine.SPLIT_VALUE\' 는 버퍼 크기 초과 100 이하 여야 합니다.");
            //   return false;
            // }
            return true;
          },
          initMap(){
            // eslint-disable-next-line no-undef
            this.DrawLine.map = new Tmapv2.Map("map_div", {
            width : "70%",
            height : "350px",
            zoomControl : true,
            scrollwheel : true
          });

          //이동한도로찾기 API 사용할 지도 생성
          // eslint-disable-next-line no-undef
          this.DrawLine.map2 = new Tmapv2.Map("map_div2", {
            width : "70%",
            height : "350px",
            zoomControl : true,
            scrollwheel : true
          });

          navigator.userAgent.toLowerCase();
          },
          drawLine( pointList, lineColor ){


            if(lineColor == "#FF0000"){
              // eslint-disable-next-line no-undef
              new Tmapv2.Polyline({
                path : pointList,
                strokeColor : lineColor,
                strokeWeight: 6,
                map : this.DrawLine.map
              });
            }else{
              //  지도상에 그려질 스타일을 설정합니다.
              // eslint-disable-next-line no-undef
              new Tmapv2.Polyline({
                path : pointList,
                strokeColor : lineColor,
                strokeWeight: 6,
                map : this.DrawLine.map2
              });
            }
        },
      splitPoint(){
        var cntAllPoint = this.DrawLine.arrPoint.length; // 포인트 배열 갯수 구하기
        var pointString = ""; // LoadApi 에 요청할 포인트 스트링
        var arrMatchedPoint = {}; // response 결과
        var i, j, k, cntPointString = 0;
        for( i=this.DrawLine.currentIndex; i < cntAllPoint; i+=2 ) {
          // 포인트 스트링 만들기
          // 경도와 위도 사이는 ‘,’ 좌표와 좌표 사이는 ‘|’ 로 구분 지어 요청 합니다.
          if( pointString != "" ) {
            pointString += '|';
          }
          pointString += this.DrawLine.arrPoint[i] + ',' + this.DrawLine.arrPoint[i+1]; // ex) 127.925710,37.557086|127.954464,37.556542
          cntPointString++; // 포인트 스트링 개수 카운트
          // eslint-disable-next-line no-undef
          var coord = new Tmapv2.LatLng(this.DrawLine.arrPoint[i+1], this.DrawLine.arrPoint[i]);
            // eslint-disable-next-line no-undef
            new Tmapv2.Circle({	// 원 생성
              center : coord,
              radius : 20,
              fillColor : "#000000",
              fillOpacity : 0.2,
              strokeColor : "#000000",
              strokeWeight : 1,
              map : this.DrawLine.map
            });
            // eslint-disable-next-line no-undef
            new Tmapv2.Circle({	// 원 생성2
              center : coord,
              radius : 20,
              fillColor : "#FF0000",
              fillOpacity : 0.2,
              strokeColor : "#000000",
              strokeWeight : 1,
              map : this.DrawLine.map2
            });

          if( cntPointString == this.DrawLine.SPLIT_VALUE || (i+2) >= cntAllPoint ) {
            // 포인트 개수가 제한 수에 도달했다면 || 반복문의 마지막 항목 이라면 할 작업

            // 0. LoadApi 요청
            this.reqLoadApi(pointString, (response)=>{
              this.DrawLine.cntReqApi++; // API 요청횟수 카운트

              // LoadApi Response 받은 후 작업
              var matchedId = ""; // 매칭된 아이디
              // var objNextMatchedLocation = {}; // 바로 직전에 매칭된 좌표
              var objSourceLocation = {}; // 요청한 좌표
              var lastSourceIndex = -1; // 요청 포인트 인덱스 번호
              var arrPointForLine = []; // 선으로 그려질 포인트
              var arrPointForMarker = []; // 마커로 그려질 포인트
              var arrPointForCalDistance = []; // 거리 계산을 위한 포인트

              // 결과 값이 존재한다면 실행할 작업
              if( response && response.resultData.matchedPoints ) {
                arrMatchedPoint = response.resultData.matchedPoints; // 매칭된 정보 데이터(matchedPoints)를 arrMatchedPoint 배열에 담는다.
                for( j=0; j < arrMatchedPoint.length; j++ ) {
                  var objMatchedLocation = arrMatchedPoint[j].matchedLocation;

                  objSourceLocation = arrMatchedPoint[j].sourceLocation;

                  // 1. 매칭 아이디 추가 (중복제거)
                  //----------------------------------------------------------------
                  matchedId = arrMatchedPoint[j].linkId + "_" + arrMatchedPoint[j].idxName;
                  for( k=0; k < this.DrawLine.arrMatchedId.length; k++ ) {
                    if( this.DrawLine.arrMatchedId[k] == matchedId ) {
                      break;
                    }
                  }
                  if( k >= this.DrawLine.arrMatchedId.length ) {
                    // 중복된 아이디가 존재하지 않는다면 할 작업
                    this.DrawLine.arrMatchedId.push( matchedId ); // 매칭된 아이디 목록에 추가
                  }
                  //----------------------------------------------------------------

                  if( arrMatchedPoint[j].sourceIndex >= 0 ) {
                    // sourceIndex 가 존재한다면 마지막 sourceIndex 갱신
                    lastSourceIndex = arrMatchedPoint[j].sourceIndex;
                  }

                  // 2-1. 라인으로 그려질 소스 포인트 리스트 만들기
                  if( objSourceLocation ) {
                    // eslint-disable-next-line no-undef
                    arrPointForMarker.push(new Tmapv2.LatLng(objSourceLocation.latitude, objSourceLocation.longitude)); // 좌표변환
                  }

                  // 3-1. 라인으로 그려질 매칭 포인트 리스트 만들기
                  // 한번에 모든 좌표를 요청하면 문제가 없겠지만 100개 이상의 좌표를 여러번 나눠서 요청해야할 경우 요청과 요청 사이의 매칭된 링크가 어긋날 수 있다.
                  // 이를 보정하기 위해 이전 요청 좌표의 일부(버퍼)를 함깨 요청하고 매 요청의 곂치는 부분의 결과를 (버퍼사이즈/2 만큼)덜 그림으로써 좀더 매끄러운 결과를 얻을 수 있다.
                  if( arrPointForLine.length == 0 && this.DrawLine.lastMatchedLocation ) {
                    // 이전 요청의 마지막 매칭좌표가 존재한다면 현재 매칭 좌표라인의 맨 앞에 추가 ( 이전 요청 라인과 이어지게 하기 위함 )
                    // eslint-disable-next-line no-undef
                    arrPointForLine.push(new Tmapv2.LatLng(this.DrawLine.lastMatchedLocation.latitude, this.DrawLine.lastMatchedLocation.longitude)); // 좌표변환
                    arrPointForCalDistance.push( this.DrawLine.lastMatchedLocation ); // 거리 계산을 위해 저장
                    this.DrawLine.lastMatchedLocation = null;
                  }
                  if( cntAllPoint/2 <= this.DrawLine.SPLIT_VALUE ) {
                    // 1) 처음이자 마지막 요청이라면(전체 요청 좌표개수가 분할요청 기준보다 적다면) => 매칭된 좌표를 모두 라인으로 그림
                    if( objMatchedLocation ) {
                    // eslint-disable-next-line no-undef
                      arrPointForLine.push(new Tmapv2.LatLng(objMatchedLocation.latitude, objMatchedLocation.longitude)); // 좌표변환
                      arrPointForCalDistance.push( objMatchedLocation ); // 거리 계산을 위해 저장
                    }
                  }
                  else if( this.DrawLine.cntReqApi == 1 ) {
                    // 2) 처음 요청이면서 이후에 요청이 있을 예정이라면 => 뒤쪽좌표 중 버퍼의 절반 만큼 그리지 않음
                    if( objMatchedLocation && lastSourceIndex < (cntPointString-(this.DrawLine.CNT_BUFF/2)) ) {
                    // eslint-disable-next-line no-undef
                      arrPointForLine.push(new Tmapv2.LatLng(objMatchedLocation.latitude, objMatchedLocation.longitude)); // 좌표변환
                      this.DrawLine.lastMatchedLocation = objMatchedLocation; // 이후 API 요청결과와 라인을 이어가기 위해 마지막 포인트 저장
                      arrPointForCalDistance.push( objMatchedLocation ); // 거리 계산을 위해 저장
                    }
                  }
                  else if( this.DrawLine.cntReqApi > 1 && (i+2) >= cntAllPoint ) {
                    // 3) 처음이 아니면서 마지막 API 요청이라면 => 앞쪽좌표 중 버퍼의 절반 만큼 그리지 않음
                    if( objMatchedLocation && lastSourceIndex >= (this.DrawLine.CNT_BUFF/2) ) {
                      // eslint-disable-next-line no-undef
                      arrPointForLine.push(new Tmapv2.LatLng(objMatchedLocation.latitude, objMatchedLocation.longitude)); // 좌표변환
                      this.DrawLine.lastMatchedLocation = objMatchedLocation; // 이후 API 요청결과와 라인을 이어가기 위해 마지막 포인트 저장
                      arrPointForCalDistance.push( objMatchedLocation ); // 거리 계산을 위해 저장
                    }
                  }
                  else if( this.DrawLine.cntReqApi > 1 ) {
                    // 4) 처음이 아니면서 이후에 API 요청이 있을 예정이라면 => 앞쪽좌표 중 버퍼의 절반, 뒤쪽좌표 중 버퍼의 절반 만큼 그리지 않음
                    if( objMatchedLocation && lastSourceIndex >= (this.DrawLine.CNT_BUFF/2) && lastSourceIndex < (cntPointString-(this.DrawLine.CNT_BUFF/2)) ) {
                      // eslint-disable-next-line no-undef
                      arrPointForLine.push(new Tmapv2.LatLng(objMatchedLocation.latitude, objMatchedLocation.longitude)); // 좌표변환
                      this.DrawLine.lastMatchedLocation = objMatchedLocation; // 이후 API 요청결과와 라인을 이어가기 위해 마지막 포인트 저장
                      arrPointForCalDistance.push( objMatchedLocation ); // 거리 계산을 위해 저장
                    }
                  }
                }
                // 2-2. 소스 포인트 리스트로 라인 그리기
                // 요청한 좌표를 사용해 라인을 그려줍니다.(빨간색)
                this.drawLine( arrPointForMarker, "#FF0000" );

                // 3-2. 매칭 포인트 리스트로 라인 그리기
                // 요청한 좌표와 매칭되는 좌표를 사용해 라인을 그려줍니다.(파랑색)
                this.drawLine( arrPointForLine, "#0000FF" );

                // 4. 매칭된 좌표의 거리 구하기
                for( k=0; k<(arrPointForCalDistance.length-1); k++ ) {
                  this.DrawLine.totDistance += this.calDistance(arrPointForCalDistance[k].longitude, arrPointForCalDistance[k].latitude, arrPointForCalDistance[k+1].longitude, arrPointForCalDistance[k+1].latitude);
                }

                // 5. 매칭된 좌표의 개수 구하기
                this.DrawLine.totPointCount += arrPointForCalDistance.length;
                if( this.DrawLine.cntReqApi > 1 && arrPointForCalDistance.length >= 1 ) {
                  // 첫 요청이 아니면서(앞서 요청한 API 의 마지막 좌표가 포함되어 있으면서), 매칭된 포인트가 1개 이상이라면  카운트 1개 뺌
                  this.DrawLine.totPointCount--;
                }

                // 거리 계산용 포인트 리스트 초기화
                arrPointForCalDistance = [];
              }
            });

            if( (i+2) < cntAllPoint ) {
              // 마지막 항목이 아니라면 버퍼 포인트 추가
              pointString = ""; // LoadAPI 의 파라미터 초기화
              cntPointString = 0; // 포인트 스트링 개수 초기화(LoadAPI 에 포인트 분할 요청을 위한 카운트)
              i -= (this.DrawLine.CNT_BUFF*2); // 매끄러운 링크 매칭을 위해 이전 일부 포인트를 포함한 매칭을 한다. (매칭 버퍼)
              this.DrawLine.startSourceIndex = this.DrawLine.CNT_BUFF; // 매칭 버퍼 포인트를 제외하고 매칭 좌표 수를 카운트 하기 위한 변수
            }
            this.DrawLine.currentIndex = i;

            // 중간 진행과정을 화면에 표출하기 위한 작업
            if( (i+2) < cntAllPoint ) {
              this.DrawLine.currentIndex += 2; // 포인트 이동
              setTimeout( this.splitPoint, (1000/this.DrawLine.REQ_LIMIT_PER_SEC) ); // 재귀호출
              break;
            }
              }
            }

          },
          reqLoadApi( pointString, callback ){
            console.log('poinstrinf!!!!',pointString)
            var url = 'https://apis.openapi.sk.com/tmap/road/matchToRoads?version=1&appKey=l7xxf9c79745eeb2448f86433b9e231eb2f9'; // 이동한 도로 찾기 api 요청 url입니다.
                // eslint-disable-next-line no-undef
                $.ajax({
                    type: 'POST',
                  contentType: "application/x-www-form-urlencoded",
                    url: url,
                    data: {
                      "responseType" : "1", // 1:전체 데이터 요청, 2:요청좌표 및 매치된 좌표를 제외한 데이터 요청
                      "coords" : pointString // 좌표계는 WGS84GEO, 매핑에 사용될 좌표 목록입니다.  경도와 위도 사이는 "," 좌표와 좌표 사이에는 "|"로 구분지어 요청합니다.
                      },
                    async: false,
                    success: function(data) {
                      callback(data);
                    }
                });
            },
            setMapBound(){
              // eslint-disable-next-line no-undef
              var positionBounds = new Tmapv2.LatLngBounds(); // bounds 인스턴스를 생성합니다.
              var i;

              for( i=0; i < this.DrawLine.arrPoint.length; i+=2 ) {  // 포인트 배열 (resource)의 길이만큼 반복
                // 좌표변환 후 bounds 확장
                // eslint-disable-next-line no-undef
                var boundPosition = new Tmapv2.LatLng(this.DrawLine.arrPoint[i+1], this.DrawLine.arrPoint[i]);
                  positionBounds.extend(boundPosition);
              }
              this.DrawLine.map.panToBounds(positionBounds); // 매칭전 좌표가 한눈에 들어올 수 있는 지도 중심과 줌레벨 설정
                this.DrawLine.map2.panToBounds(positionBounds); // 매칭후 좌표가 한눈에 들어올 수 있는 지도 중심과 줌레벨 설정
            },
            calDistance(lon1, lat1, lon2, lat2 ){
              var theta, dist;

              if( lon1 == lon2 && lat1 == lat2 )
                return 0;

              theta = lon1 - lon2;
              dist = Math.sin(this.deg2rad(lat1)) * Math.sin(this.deg2rad(lat2)) + Math.cos(this.deg2rad(lat1))
                    * Math.cos(this.deg2rad(lat2)) * Math.cos(this.deg2rad(theta));
              dist = Math.acos(dist);
              dist = this.rad2deg(dist);

              dist = dist * 60 * 1.1515;
              dist = dist * 1.609344; // 단위 mile 에서 km 변환
              dist = dist * 1000.0; // 단위  km 에서 m 로 변환

              return Number(Number(dist).toFixed(2));
            },
            deg2rad( deg ){
              return (deg * Math.PI / 180);
            },
            rad2deg( rad ){
              return (rad * 180 / Math.PI);
            },


          }
        }
	</script>

