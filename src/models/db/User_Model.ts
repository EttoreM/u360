import type { User } from "../../types/db/User";


export class User_Model implements User{

  private _id              : number | undefined;
  private _first_name      : string;
  private _last_name       : string;
  private _email           : string;
  private _password : string;
  private _institution     : number;
  private _role            : number;

  constructor(_user : User) {
    this._id              = _user.id;
    this._first_name      = _user.first_name;
    this._last_name       = _user.last_name;
    this._email           = _user.email;
    this._password = _user.password;
    this._institution     = _user.institution;
    this._role            = _user.role;
  }

  get id() {
    return this._id;
  }

  get first_name() {
    return this._first_name;
  }
  get last_name() {
    return this._last_name;
  }
  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get institution() {
    return this._institution;
  }

  get role() {
    return this._role;
  }

}