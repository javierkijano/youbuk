export class SearchServiceModel {
    services: Array<ServiceItemModel>;
  }

export class ServiceItemModel {
    category: string;
    subcategory: string;
    service: string;
    key_words: string;
  }