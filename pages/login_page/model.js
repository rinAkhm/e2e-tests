// @ts-check

export class LoginModel {
  constructor( username=process.env.LOGIN, password=process.env.PASSWORD ) {
    this.username = username;
    this.passsword = password;
  };
};