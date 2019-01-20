export class SearchServiceModel {
    services: Array<ServiceItemModel>;
  }

export class ServiceItemModel {
    title: string;
    serviceSelected: boolean = true;
    key_words: string;
    image: string;
    category: string;
    subcategory: string;
  }