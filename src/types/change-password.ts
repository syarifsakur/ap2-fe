export interface ChangePassword {
  password_old: string;
  password_new: string;
  password_confirm: string;
}

export interface ErrorState {
  [key: string]: string;
}