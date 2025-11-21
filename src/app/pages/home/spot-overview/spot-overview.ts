import { Component, computed, OnInit } from '@angular/core';
import { SpotService } from '../../../services/spot.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerService } from '../../../core/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpotOverviewModel } from '../../../shared/models/spot.model';
import { PageHeader } from "../../../components/page-header/page-header";
import { SessionService } from '../../../core/services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spot-overview',
  imports: [PageHeader],
  templateUrl: './spot-overview.html',
  styleUrl: './spot-overview.css',
  host: {
    class: "flex flex-col w-full justify-start items-center"
  }
})
export class SpotOverview implements OnInit{
  protected spotOverview!: SpotOverviewModel
  protected lang: String = 'en';
  protected sub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotService: SpotService,
    private toastr: HotToastService,
    private spinner: SpinnerService,
    private session: SessionService
  ){ }

  ngOnInit(): void {
    this.sub = this.session.language.subscribe((lang) => {
      this.lang = lang;
    });

    this.activatedRoute.data.subscribe({
      next: (data : any) => {
        this.spotOverview = data['0'];  
      },
      error: () => {
        this.toastr.error('Failed to load spot overview');
      }
    });
  }
}
