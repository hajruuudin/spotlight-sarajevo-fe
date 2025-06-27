import { AfterViewInit, ApplicationRef, Component, createComponent, Injector, OnInit } from '@angular/core';
import { EnvironmentInjector } from '@angular/core';
import * as L from 'leaflet';
import { SpotLocationModel, SpotModel } from '../../models/spot-model';
import { SpotService } from '../../services/spot.service';
import { MapPopupComponent } from '../../components/map-popup/map-popup.component';
import { Router } from '@angular/router';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-map-view',
  imports: [SearchBarComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit, OnInit {
  private map!: L.Map;
  protected allSpots: SpotLocationModel[] = []

  constructor(
    private spotService: SpotService,
    private router: Router,
    private injector: EnvironmentInjector,
    private appRef: ApplicationRef,
  ) { }

  ngOnInit(): void {
    this.spotService.getSpotLocations("").subscribe({
      next: (response: SpotLocationModel[]) => {
        this.allSpots = response
        this.addMarkers()
        console.log(this.allSpots)
      }
    })
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  protected searchSpots(search: string) {
    this.spotService.getSpotLocations(search).subscribe({
      next: (response: SpotLocationModel[]) => {
        this.allSpots = response
        this.initMap()
        this.addMarkers()

      }
    })
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map', {
      center: [43.8563, 18.4131],
      zoom: 13
    });

    L.tileLayer('https://tile.jawg.io/d48351eb-cef0-42ad-b04f-636d8fafeb7c/{z}/{x}/{y}{r}.png?access-token=fLhQa6S8g6w3oztynVHSyFh8rfy1AtHfYqQSi7lgD3yioLFB214fM9VHHOn3yqRP', {
      attribution: '&copy; <a href="https://www.jawg.io">Jawg</a>',
      subdomains: ['a', 'b', 'c', 'd'],
      tileSize: 256,
      zoomOffset: 0,
      detectRetina: true
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.allSpots.forEach(spot => {
      const customIcon = this.getMarkerIcon(spot.categoryName);

      const componentRef = createComponent(MapPopupComponent, {
        environmentInjector: this.injector,
      });

      componentRef.instance.spotName = spot.officialName;
      componentRef.instance.spotCategory = spot.categoryName;
      componentRef.instance.spotImageUrl = spot.imageUrl;
      componentRef.instance.spotSlug = spot.slug;
      componentRef.instance.navigateClicked.subscribe(() => {
        this.router.navigate([`spot/${spot.slug}`]);
      });

      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

      const marker = L.marker([spot.lattitude, spot.longitude], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(domElem);

      marker.on('popupclose', () => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      });
    });
  }

  private getMarkerIcon(categoryName: string): L.Icon {
    const fileName = this.formatCategoryToFilename(categoryName);
    return L.icon({
      iconUrl: `assets/markers/marker_${fileName}.png`,
      iconSize: [38, 48],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });
  }

  private formatCategoryToFilename(categoryName: string): string {
    return categoryName
      .trim()
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  }

}
