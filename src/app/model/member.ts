import { Photo } from './photo';
export interface Member {
    id: number;
    userName: string;
    dateOfBirth: Date
    age: number
    created: Date;
    lastActive: Date
    knownAs: string
    gender: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    photoUrl: string
    photos: Photo []
}
