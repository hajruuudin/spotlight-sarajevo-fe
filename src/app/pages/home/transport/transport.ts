import { Component, OnInit } from '@angular/core';
import { PageHeader } from "../../../components/page-header/page-header";
import { Subheading } from "../../../components/subheading/subheading";
import { TranslocoPipe } from '@ngneat/transloco';
import { SessionService } from '../../../core/services/session.service';
import { PublicTransportService } from '../../../services/transport.service';
import { TransportMethodModel, TransportMethodShorthandModel, TransportMethodLineModel, TaxiCompanyModel } from '../../../shared/models/transport.model';
import { TransportType, TRANSPORT_OPERATORS } from '../../../shared/constants/TransportOperators';
import { TAXI_COMPANIES } from '../../../shared/constants/TaxiCompanies';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-transport',
  imports: [PageHeader, Subheading, TranslocoPipe, LeafletModule, NgClass],
  templateUrl: './transport.html',
  styleUrl: './transport.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class Transport implements OnInit {
  transportMethods: TransportMethodShorthandModel[] = [];
  selectedMethod: TransportMethodModel | null = null;
  selectedMethodId: number = TransportType.TRAMCAR;
  transportLines: TransportMethodLineModel[] = [];
  taxiCompanies: TaxiCompanyModel[] = TAXI_COMPANIES;
  
  map!: L.Map;
  mapOptions!: L.MapOptions;
  geoJsonLayer: L.GeoJSON | null = null;

  readonly TransportType = TransportType;

  constructor(
    public session: SessionService,
    private transportService: PublicTransportService
  ) {}

  ngOnInit(): void {
    this.loadTransportMethods();
    this.prepareMap();
    this.selectMethod(TransportType.TRAMCAR);
  }

  loadTransportMethods(): void {
    this.transportService.findAllTransportMethods().subscribe({
      next: (methods) => {
        this.transportMethods = methods;
      },
      error: (err) => {
        console.error('Error loading transport methods:', err);
      }
    });
  }

  selectMethod(methodId: number): void {
    this.selectedMethodId = methodId;
    
    if (methodId === TransportType.TAXI) {
      this.selectedMethod = null;
      this.transportLines = [];
      this.clearGeoJsonLayer();
      return;
    }

    this.transportService.findMethodById(methodId).subscribe({
      next: (method) => {
        this.selectedMethod = method;
        this.updateMapWithGeoJson(method.geometryGeoJson);
      },
      error: (err) => {
        console.error('Error loading transport method:', err);
      }
    });

    this.loadTransportLines(methodId);
  }

  loadTransportLines(transportTypeId: number): void {
    const allLines: TransportMethodLineModel[] = [];
    let completedRequests = 0;

    TRANSPORT_OPERATORS.forEach(operator => {
      this.transportService.findLinesByOperatorAndTransportType(operator.id, transportTypeId).subscribe({
        next: (lines) => {
          allLines.push(...lines);
          completedRequests++;
          if (completedRequests === TRANSPORT_OPERATORS.length) {
            this.transportLines = allLines;
          }
        },
        error: (err) => {
          console.error('Error loading transport lines:', err);
          completedRequests++;
        }
      });
    });
  }

  prepareMap(): void {
    const sarajevoCenter: L.LatLngTuple = [43.8563, 18.4131];
    
    if (this.session.theme() === 'dark') {
      this.mapOptions = {
        zoom: 12,
        center: sarajevoCenter,
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
    } else {
      this.mapOptions = {
        zoom: 12,
        center: sarajevoCenter,
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

  onMapReady(map: L.Map): void {
    this.map = map;
  }

  updateMapWithGeoJson(geoJsonString: string): void {
    if (!this.map) return;
    
    this.clearGeoJsonLayer();

    try {
      const geoJsonData = JSON.parse(geoJsonString);
      const lineColor = this.getLineColor();
      
      this.geoJsonLayer = L.geoJSON(geoJsonData, {
        style: {
          color: lineColor,
          weight: 4,
          opacity: 0.8
        }
      }).addTo(this.map);

      if (this.geoJsonLayer.getBounds().isValid()) {
        this.map.fitBounds(this.geoJsonLayer.getBounds(), { padding: [20, 20] });
      }
    } catch (e) {
      console.error('Error parsing GeoJSON:', e);
    }
  }

  clearGeoJsonLayer(): void {
    if (this.geoJsonLayer && this.map) {
      this.map.removeLayer(this.geoJsonLayer);
      this.geoJsonLayer = null;
    }
  }

  getLineColor(): string {
    switch (this.selectedMethodId) {
      case TransportType.TRAMCAR:
        return '#ef4444';
      case TransportType.TROLLEY:
        return '#3b82f6';
      case TransportType.BUS:
        return '#22c55e';
      default:
        return '#8b5cf6';
    }
  }

  isTaxi(): boolean {
    return this.selectedMethodId === TransportType.TAXI;
  }
}
