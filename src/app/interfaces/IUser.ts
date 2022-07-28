export interface IUser {
    identification_number: string;
    identification_type: string;
    name: string;
    surname: string;
    age: number;
    date_of_birth: Date;
    address: string;
    phone: string;
    blood_type: string;
    email: string;
    status?: boolean;
  }
  

export interface UserCardProps {
    user: IUser;
}