export interface IImage {
  url: string;
}
export interface IRating {
  rating: number;
}

export interface IBookPreview {
  issueYear: string;
  rating: number;
  title: string;
  authors: string[];
  image: IImage;
  categories: string[];
  id: number;
  booking?: any;
  delivery?: any;
  histories?: any;
}

export interface IUser {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl?: any;
}
export interface IComment {
  id: number;
  rating: number;
  text: string;
  createdAt: Date;
  user: IUser;
}
export interface IBook {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: IImage[];
  categories: string[];
  comments: IComment[];
  booking?: any;
  delivery?: any;
  histories?: any;
}

export interface ICategories {
  name: string;
  path: string;
  id: number;
}

export interface IContentView {
  viewType: 'grid' | 'column';
  menuState: boolean;
  burgerState: boolean;
  commentsState: boolean;
  errorIsOpen: boolean;
  sortType: 'ASC' | 'DESC';
  accountModal: boolean;
}

export interface IAlertSlice {
  isShow: boolean;
  text: string;
  alertStatus: 'successful' | 'error';
}

export interface IGetAllBooks {
  books: IBookPreview[] | [];
  status: 'init' | 'loading' | 'error' | 'success';
}
export interface IGetCategories {
  categories: ICategories[] | [];
  status: 'init' | 'loading' | 'error' | 'success';
}
export interface IGetOneBook {
  book: IBook | null;
  status: 'init' | 'loading' | 'error' | 'success';
}

export interface IButtonProps {
  isOrdered?: boolean | null;
  inStock?: boolean | null;
  bookedUntil?: Date;
  content?: string | undefined;
}

export interface ISearchInput {
  query: string;
}
