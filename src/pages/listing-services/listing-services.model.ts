export class ListingServicesItemModel {
  name: string;
  image: string;
  description: string;
}
export class ListingServicesModel {
  items: Array<ListingServicesItemModel>;
}
