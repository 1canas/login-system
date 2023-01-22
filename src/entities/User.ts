import crypto from "crypto";

export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export default class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;

  constructor(props: UserProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
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

  toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password
    }
  }
}
