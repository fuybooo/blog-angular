import {Component, OnInit} from '@angular/core';
import {slideInDownAnimation} from "../shared/animations";
import {HttpClient} from "@angular/common/http";
// import * as moment from 'moment';
export declare let AMap: any;
@Component({
  selector: 'app-amap-line',
  templateUrl: './amap-line.component.html',
  animations: [slideInDownAnimation]
})
export class AmapLineComponent implements OnInit {
  lineMap;
  allPoints;
  markers = [];
  linePoints;
  isLine = false;
  searchText = '';
  startDate = null;
  endDate = null;
  hideSearch = true;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // 创建地图
    this.lineMap = new AMap.Map('map-line', {
      center: [116.40, 39.91],
      zoom: 13
    });
    // 获取所有的点
    this.getAllPoint();
  }
  getAllPoint() {
    this.http.get('./assets/json/map-line-position.json').subscribe((res: any[]) => {
      this.allPoints = res;
      for (let position of res) {
        let marker = new AMap.Marker({
          position: [position.longitude, position.latitude],
          map: this.lineMap
        });
        this.markers.push(marker);
      }
      this.bindMarkerEvent();
    });
  }
  bindMarkerEvent() {
    for (let i = 0; i < this.allPoints.length; i ++) {
      let marker = this.markers[i];
      marker.on('click', () => {
        console.log('您点击了点：', this.allPoints[i]);
        // 查询该点的轨迹
        this.getLine();
      });
    }
  }
  getLine() {
    this.clearPoint();
    this.http.get('./assets/json/map-line.json').subscribe((res: any[]) => {
      this.linePoints = res;
      let lineArr = [];
      for (let point of res) {
        lineArr.push([point.longitude, point.latitude]);
      }
      let polyline = new AMap.Polyline({
        path: lineArr,
        strokeColor: "#3366FF", // 线颜色
        strokeOpacity: 1,       // 线透明度
        strokeWeight: 5,        // 线宽
        strokeStyle: "solid",   // 线样式
        strokeDasharray: [10, 5] // 补充线样式
      });
      polyline.setMap(this.lineMap);
    });
  }
  clearPoint() {
    this.markers.forEach(marker => {
      marker.setMap(null);
      marker = null;
    });
  }
  searchPoint() {
    if (this.hideSearch) {
      this.hideSearch = false;
    } else {
      // 进行搜索
      if (!this.searchText) {
        this.hideSearch = true;
      } else {
        
      }
    }
  }
  searchLine() {

  }
  back() {

  }
  startValueChange() {
    if (this.startDate > this.endDate) {
      this.endDate = null;
    }
  }
  disabledStartDate(startValue) {
    if (!startValue || !this.endDate) {
      return false;
    }
    console.log('start', startValue);
    console.log('end', this.endDate);
  }
  endValueChange() {
    if (this.startDate > this.endDate) {
      this.startDate = null;
    }
  }
  disabledEndDate(endValue) {
    if (!endValue || !this.startDate) {
      return false;
    }
    console.log('end', endValue);
    console.log('start', this.startDate);
  }
}
