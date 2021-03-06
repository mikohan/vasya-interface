export interface IRow {
  id?: number | string;
  uuid: string;
  oneCId: number;
  name: string;
  brand: string;
  catNumber: string;
  attibute?: boolean;
  photo: boolean;
  video: boolean;
  description: string;
  isDone: boolean;
  dateCreated?: Date;
  dateChanged?: Date;
  photoSite?: boolean;
  descSite?: boolean;
  linkToSite?: string;
  linkToProduct?: string;
  videoUrl: string;
}
