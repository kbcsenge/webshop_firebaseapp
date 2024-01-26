import {Component, OnInit} from '@angular/core';
import { Tags } from 'src/app/shared/models/Tags';
import { TagsService } from 'src/app/shared/services/tags.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/Product';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit{
  tags : Tags [] = [];
  selectedTag: string | null = null;
  constructor(private route: ActivatedRoute,private router: Router, private tagsService: TagsService,private productService:ProductService){

  }
  ngOnInit(): void {
    this.tagsService.getAllTags().subscribe(tags => {
      this.tags = tags;
    });
  }
  onSaveSelectedTag(tagId: string): void {
    console.log('Selected Tag:', tagId);
  }
}
