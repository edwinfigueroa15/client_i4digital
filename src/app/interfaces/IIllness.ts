import { IUser } from "./IUser";

export interface IIllness {
  id?: string;
  disease_name: string;
  sugar: number;
  fat: number;
  oxygen: number;
  risk: string;
  id_user: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IIllnessCreate {
  id?: string;
  disease_name: string;
  sugar: number;
  fat: number;
  oxygen: number;
  risk: string;
  id_user: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IIllnessUser extends IIllness {
  User: IUser;
}