export interface User {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    refreshToken?: string;
    avatar?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends User {
    confirmPassword: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface Pet {
    _id: string;
    petName: string;
    petType: string;
    petBread: string;
    petDescription: string;
    price: number;
    isFree: boolean;
    isAdopted: boolean;
    diseases: string;
    petImages: PetImage[];
    owner: string;
    created_at: string;
    updated_at: string;
    __v: number;
}

interface PetImage {
    publicId: string;
    url: string;
    _id: string;
}

export interface Product {
    _id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    discount: number;
    creator: string;
    productImages:ProductImage[];
    quantity: number;
    category: string;
    ratings: Rating[];
    averageRating: number;
}

interface ProductImage {
    publicId: string;
    url: string;
    _id: string;
}
interface Rating {
    userId: string;
    rating: number;
}

export interface Blog {
    _id: string;
    title: string;
    content: string;
    category: string[];
    likes: string[];
    coverImage: { publicId: string; url: string };
    userDetails: User;
}