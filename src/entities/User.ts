import crypto from "crypto";
import bcrypt from "bcrypt";

export type UserProps = {
  name: string;
  email: string;
  password: string;
};

export default class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public hashedPassword: string;

  constructor(props: UserProps, id?: string) {
    this.id = id || crypto.randomUUID();
    
    this.name = props.name;
    this.email = props.email;
    this.hashedPassword = this.hashPassword(props.password);
  }

  updateName(name: string) {
    this.name = name;
  }

  updateEmail(email: string) {
    this.email = email;
  }

  updatePassword(password: string) {
    this.hashedPassword = this.hashPassword(password);
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.hashedPassword)
  }

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.hashedPassword
    }
  }
}
