//import { Observable } from "rxjs";

export class CategoriesModel {
  categories: Array<CategoriesItemModel>;
  banner_title: string;
  banner_image: string;
}

export class CategoriesItemModel {
  category_id: string;
  title: string;
  image: string;
}

export class SubcategoriesModel {
  subcategories: Array<SubcategoriesItemModel>;
  banner_title: string;
  banner_image: string;
}

export class SubcategoriesItemModel {
  subcategory_id: string;
  title: string;
  image: string;
  category_id: string;
}

export class PopularsModel {
  populars: Array<PopularsItemModel>;
  banner_title: string;
  banner_image: string;
}

export class PopularsItemModel {
  popular_id: string;
  title: string;
  image: string;
  service_id: string;
}

export class ServicesModel {
    services: Array<ServicesItemModel>;
  }

export class ServicesItemModel {
    service_id: string
    title: string;
    subcategory_id: string;
    serviceSelected: boolean = true;
    SERVICES_KEYWORDS: any[];
    image: string;
  }




