import { User } from 'src/models/user.model';

export class UserDTO implements Readonly<UserDTO> {
  username: string;

  public static from(user: Partial<User>): UserDTO {
    const userDto = new UserDTO();
    userDto.username = user.username;
    return userDto;
  }

  public static fromEntity(user: User): UserDTO {
    return this.from({ username: user.username });
  }
}
