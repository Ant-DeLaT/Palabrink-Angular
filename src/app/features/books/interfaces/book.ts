export interface Book {
  id: string;
  title: string;
  isbn?: string;
  cover_url?: string;
  author?: string;
  genre?: string;
  rating?: number;
  description?: string;
}
