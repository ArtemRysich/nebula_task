export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  gender: string;
  birthDate: Date;
  birthTime?: string;
  privacyPolicyAccepted: boolean;
  isSubscribedToOffers: boolean;
  phoneNumber?: string;
}
