import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { TranslocoPipe } from '@ngneat/transloco';
import { map, of, Subscription, switchMap } from 'rxjs';
import { SessionService } from '../../../core/services/session.service';
import {
  CollectionCreateModel,
  CollectionItemsModel,
  CollectionModel,
} from '../../../shared/models/collection.model';
import { CollectionService } from '../../../services/collection.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActivatedRoute } from '@angular/router';
import { CollectionPageData } from '../../../core/resolvers/collection.resolver';
import { ButtonPrimary } from '../../../components/button-primary/button-primary';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from '../../../components/not-found-component/not-found-component';
import { ModalService } from '../../../core/services/modal.service';
import { AddCollectionModal } from '../../../components/modals/add-collection-modal/add-collection-modal';
import { SpinnerService } from '../../../core/services/spinner.service';
import { NgClass } from '@angular/common';
import { TeleportOutletDirective } from "@ngneat/overview";

@Component({
  selector: 'app-collections',
  imports: [ReactiveFormsModule, PageHeader, TranslocoPipe, ButtonPrimary, NotFoundComponent, NgClass],
  templateUrl: './collections.html',
  styleUrl: './collections.css',
  host: {
    class: 'flex flex-col w-full justify-start items-center',
  },
})
export class Collections implements OnInit {
  protected userCollections: CollectionModel[] = [];
  protected userEventCollections: CollectionModel[] = [];
  protected userSpotCollections: CollectionModel[] = [];

  protected selectedCollection!: CollectionItemsModel;
  protected collectionSelectForm: FormGroup;

  constructor(
    private session: SessionService,
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private toastr: HotToastService,
    private modal: ModalService,
    private cdr: ChangeDetectorRef,
    private spinner: SpinnerService,
    private fb: FormBuilder
  ) {
    this.collectionSelectForm = this.fb.group({
      selectedCollection: [null],
    });
  }

  ngOnInit(): void {
    const data = this.route.snapshot.data['collectionData'] as CollectionPageData;
    this.userCollections = data.userCollections;

    this.divideUserCollection();

    if (data.selectedCollection) {
      this.selectedCollection = data.selectedCollection;
    } else {
      this.fetchSelectedCollection(this.userCollections[0].id);
    }
  }

  fetchSelectedCollection(collectionId: number) {
    this.collectionService.findCollectionItems(collectionId).subscribe({
      next: (response: CollectionItemsModel) => {
        this.selectedCollection = response;
        this.cdr.detectChanges()
      },
      error: (response: HttpErrorResponse) => {
        this.toastr.error(
          this.session.language() == 'en'
            ? 'Cannot load that collection! :('
            : 'Kolekcija se ne moze ucitati! :('
        );
      },
    });
  }

  divideUserCollection() {
    this.userEventCollections = this.userCollections.filter(
      (col) => col.collectionType === 'EVENT'
    );

    this.userSpotCollections = this.userCollections.filter((col) => col.collectionType === 'SPOT');
  }

  async openAddCollectionModal() {
    const result = await this.modal.openAsync<{ type: string; data?: any }>(AddCollectionModal, {});

    if (result?.type === 'cancel') return;
    if (result?.type === 'invalid') {
      this.toastr.info('All fields are required!');
      return;
    }

    if (result.type === 'add') {
      this.addNewCollection(
        new CollectionCreateModel(
          result.data.collectionName,
          result.data.collectionDescription,
          result.data.collectionType == 1 ? 'SPOT' : 'EVENT'
        )
      );
    }
  }

  addNewCollection(request: CollectionCreateModel) {
    this.spinner.showNavigateSpinner();
    this.collectionService.addCollection(request).subscribe({
      next: (response: CollectionModel) => {
        this.spinner.hideNavigateSpinner();
        this.toastr.success(
          this.session.language() == 'en' ? 'New collection created!' : 'Nova kolekcija napravljena'
        );
        this.reloadCollections();
        
      },
      error: (response : HttpErrorResponse) => {
        this.spinner.hideNavigateSpinner();
        this.toastr.error(
          this.session.language() == 'en' ? 'Something went wrong!' : 'Nesto je krenulo po zlu'
        )
      }
    });
  }

  reloadCollections() {
    this.collectionService.findUserCollections().subscribe({
      next: (response : CollectionModel[]) => {
        this.userCollections = response
        this.divideUserCollection()
        this.cdr.detectChanges()
      }
    })
  }
}
