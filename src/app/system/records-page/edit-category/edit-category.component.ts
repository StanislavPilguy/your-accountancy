import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

import {Category} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'pips-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  private title = 'Редактировать категорию';
  private currentCategoryId = 1;
  private currentCategory: Category;
  private message: Message;
  private sub1: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');

    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let { capacity, name } = form.value;
    if (capacity < 0 ) {
      capacity *= -1;
    }

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.sub1 = this.categoriesService.updateCategory(category).subscribe((category: Category) => {
      this.onCategoryEdit.emit(category);
      this.message.text = 'Категория успешно отредактирована';
      window.setTimeout(() => this.message.text = '', 3000);
    });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
