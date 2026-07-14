export type SpotCategory =
  | "Viewpoint"
  | "Cafe"
  | "Park"
  | "Heritage"
  | "Rooftop"
  | "Street Food"
  | "Lake";

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export interface Review {
  user: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Spot {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: SpotCategory;
  images: string[];
  location: string;
  entryFee: number;
  bestTimeToVisit: string;
  difficulty: Difficulty;
  averageRating: number;
  reviews: Review[];
  addedBy: string;
  addedByName: string;
  createdAt: string;
}

export interface SpotsResponse {
  items: Spot[];
  total: number;
  page: number;
  totalPages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const CATEGORIES: SpotCategory[] = [
  "Viewpoint",
  "Cafe",
  "Park",
  "Heritage",
  "Rooftop",
  "Street Food",
  "Lake",
];

export const DIFFICULTIES: Difficulty[] = ["Easy", "Moderate", "Challenging"];
