export class SubcategoriesListingModel {
  populars: Array<SubcategoriesListingItemModel>;
  subcategories: Array<SubcategoriesListingItemModel>;
  banner_title: string;
  banner_image: string;
}

export class SubcategoriesListingItemModel {
  title: string;
  image: string;
}
