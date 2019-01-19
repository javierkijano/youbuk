export class SearchServiceModel {
    services: Array<ServiceItemModel>;
  }

export class ServiceItemModel {
    category: string;
    subcategory: string;
    service: string;
    serviceSelected: boolean = true;
    key_words: string;
  }