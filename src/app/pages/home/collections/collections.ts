import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../../components/page-header/page-header';
import { TranslocoPipe } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { SessionService } from '../../../core/services/session.service';
import { CollectionItemsModel, CollectionModel } from '../../../shared/models/collection.model';
import { CollectionService } from '../../../services/collection.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActivatedRoute } from '@angular/router';
import { CollectionPageData } from '../../../core/resolvers/collection.resolver';
import { ButtonPrimary } from "../../../components/button-primary/button-primary";
import { FormBuilder, FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-collections',
  imports: [ReactiveFormsModule, PageHeader, TranslocoPipe, ButtonPrimary, ɵInternalFormsSharedModule],
  templateUrl: './collections.html',
  styleUrl: './collections.css',
  host: {
    class: 'flex flex-col w-full justify-start items-center',
  },
})
export class Collections implements OnInit {
  protected lang: string = 'en';
  protected theme: string = 'theme';
  protected langSub!: Subscription;
  protected themeSub!: Subscription;

  protected userCollections: CollectionModel[] = [];
  protected selectedCollection!: CollectionItemsModel;
  protected collectionSelectForm: FormGroup

  constructor(
    private session: SessionService,
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private toastr: HotToastService,
    private fb: FormBuilder
  ) {
    this.collectionSelectForm = this.fb.group({
      'selectedCollection' : [1]
    })
  }

  ngOnInit(): void {
    this.langSub = this.session.language.subscribe((lang) => {
      this.lang = lang;
    });

    this.themeSub = this.session.theme.subscribe((theme) => {
      this.theme = theme;
    });

    const data = this.route.snapshot.data['collectionData'] as CollectionPageData;

    this.userCollections = data.userCollections;
    if (data.selectedCollection) {
      this.selectedCollection = data.selectedCollection;
    }
  }

  fetchSelectedCollection(collectionId: number) {
    this.collectionService.findCollectionItems(collectionId).subscribe({
      next: (response: CollectionItemsModel) => {
        this.selectedCollection = response;
      },
      error: (response: HttpErrorResponse) => {
        this.toastr.error(
          this.lang == 'en' ? 'Cannot load that collection! :(' : 'Kolekcija se ne moze ucitati! :('
        );
      },
    });
  }
}
