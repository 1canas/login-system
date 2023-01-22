import crypto from "crypto";

export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export default class User {
  public readonly id: string;
  public props: Required<UserProps>

  constructor(props: UserProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.props = props;
  }

  private set name(value: string) {
    this.props.name = value;
  }
  
  public get name() {
    return this.props.name;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  public get email() {
    return this.props.email;
  }

  private set password(value: string) {
    this.props.password = value;
  }
  
  public get password() {
    return this.props.password;
  }

  updateName(name: string) {
    this.name = name;
  }

  updateEmail(email: string) {
    this.email = email;
  }

  updatePassword(password: string) {
    this.password = password;
  }

  toJSON() {
    return JSON.stringify({
      ...this.props,
      id: this.id
    })
  }
}
