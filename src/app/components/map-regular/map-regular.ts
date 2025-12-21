import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map-regular',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-regular.html',
  styleUrls: ['./map-regular.css'],
  host: {
    class: 'w-full h-full rounded-2xl',
  },
})
export class MapRegular implements OnInit {
  private customIcon = L.icon({
    iconUrl: 'assets/markers/default-pin.svg',
    iconSize: [60, 60],
    iconAnchor: [20, 40],
  });

  @Input() layoutMode: string = 'dark';
  @Input() objectLat: number = 0.0;
  @Input() objectLong: number = 0.0;
  @Input() objectType: string = 'no-type';
  @Input() objectCategoryEn: String = 'no-category';
  @Input() objectCategoryBs: String = 'no-category';

  map!: L.Map;
  mapOptions!: L.MapOptions;

  ngOnInit(): void {
    this.prepareMap();
  }

  prepareMap() {
    if (this.layoutMode == 'dark') {
      this.mapOptions = {
        zoom: 16,
        center: [this.objectLat, this.objectLong],
        layers: [
          L.tileLayer(
            'https://tile.jawg.io/668ed1fa-3dc7-4f82-8320-53ee9ba7536b/{z}/{x}/{y}{r}.png?access-token=BKxt3zjFvSaHNF8hQyr8M8hn0dDlQH0Bwr8leZvo1lYS4kDzzXggeLp5fa9sypKQ',
            {
              attribution: '&copy; <a href="https://www.jawg.io">Jawg</a>',
              maxZoom: 22,
            }
          ),
        ],
      };
    } else if (this.layoutMode == 'light'){
      this.mapOptions = {
        zoom: 16,
        center: [this.objectLat, this.objectLong],
        layers: [
          L.tileLayer(
            'https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=BKxt3zjFvSaHNF8hQyr8M8hn0dDlQH0Bwr8leZvo1lYS4kDzzXggeLp5fa9sypKQ',
            {
              attribution: '&copy; <a href="https://www.jawg.io">Jawg</a>',
              maxZoom: 22,
            }
          ),
        ],
      };
    }
  }

  onMapReady(map: L.Map) {
    this.map = map;
    console.log(this.objectLong, this.objectLat);
    this.addSpotMarker();
    // this.locateUserAndDrawDistance();
  }

  addSpotMarker() {
    L.marker([this.objectLat, this.objectLong], { icon: this.customIcon }).addTo(this.map);
  }

  // locateUserAndDrawDistance() {
  //   const target = L.latLng(this.objectLat, this.objectLong);

  //   this.map.locate({ setView: false });

  //   this.map.on('locationfound', async (e: L.LocationEvent) => {
  //     const userLatLng = e.latlng;

  //     const htmlMarker = L.divIcon({
  //       html: `<div class="user-marker"></div>`,
  //       className: '',
  //       iconSize: [30, 30],
  //       iconAnchor: [15, 30],
  //     });

  //     L.marker(userLatLng, { icon: htmlMarker }).addTo(this.map);
  //     L.marker(target, { icon: this.customIcon }).addTo(this.map);

  //     const router = (L.Routing as any).osrmv1({});

  //     router.route([userLatLng, target], (err: any, routes: any) => {
  //       if (err || !routes || !routes[0]) return;

  //       const routeLine = L.Routing.line(routes[0], {
  //         styles: [{ color: 'blue', weight: 4, opacity: 0.7 }],
  //         extendToWaypoints: false,
  //         missingRouteTolerance: 10,
  //       });

  //       routeLine.addTo(this.map);

  //       // Optional: zoom map to route
  //       this.map.fitBounds(routeLine.getBounds());
  //     });
  //   });
  // }
}
