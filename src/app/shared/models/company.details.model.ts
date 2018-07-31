export interface CompanyDetailsModel {
  Id: number;
  Name: string;
  Bin: string;
  Kbe: number;
  CountryId: number;
// public Country Country { get; set; }
  Email: string;
  Telephone: string;
  Fax: string;
  AddressLegal: string;
  AddressActual: string;
  PostCode: string;
  Director: string;
  DirectorPowers: string;
  Comments: string;
  UpdateDate: Date;
  CreateDate: Date;
  Iik: string;
  Bik: string;
  FilesListId: number;
  Govregnumber: string;
  Govregdate: Date;
}
