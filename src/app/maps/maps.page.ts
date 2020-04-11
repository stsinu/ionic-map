import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";

declare var google;

@Component({
  selector: "app-maps",
  templateUrl: "./maps.page.html",
  styleUrls: ["./maps.page.scss"]
})
export class MapsPage implements OnInit {
  mapRef = null;
  a = this.addMaker(35.0361, 9.484000000000037);
  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) {}
  ngOnInit() {
    this.loadMap();
  }
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById("map");
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      loading.dismiss();
      this.addMaker(myLatLng.lat, myLatLng.lng);
      this.addMaker(35.0361, 9.484000000000037);
    });
  }

  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: "Hello World!"
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }
}
