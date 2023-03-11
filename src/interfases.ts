export  type  TStatus = 'init' | 'loading' | 'error' | 'success';

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
  status: TStatus;
}
export interface IGetCategories {
  categories: ICategories[] | [];
  status: TStatus;
}
export interface IGetOneBook {
  book: IBook | null;
  status: TStatus;
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


export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  phone: string;
}
export interface DataAuth {
  jwt: string;
  user: User;
}
export interface IUserAuth {
  identifier: string;
  password: string;
}

export interface AuthError{
  status: number;
  name: string;
  message: string;
  details: any;
}

export interface IAuthState {
  user: User | null;
  error: AuthError | null;
  status: TStatus;
  authDetails: IUserAuth | null;
}
export interface IRegistrationState {

  error: AuthError | null;
  status: TStatus;
}


export interface IAuthResponse {
  user: User;
  jwt: string;
}

export interface IAuthErrorResponse {
  error: AuthError;
}
export interface IRegistrationData {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IForgotPasswordState{
  ok: boolean;
  status: TStatus;
}

export interface IResetPasswordRequest {
  password: string;
  passwordConfirmation: string;
  code: string;
}


export interface ResetPassword {
  status: TStatus;
}
