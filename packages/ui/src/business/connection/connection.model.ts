import { v4 as uuid } from 'uuid';
import { IsString, Length, IsUUID } from 'class-validator';

export class ConnectionModel {
  static createConnectionModel(accountName: string, containerName: string, sas: string): ConnectionModel {
    const id = uuid();

    return new ConnectionModel(id, accountName, containerName, sas);
  }

  @IsString()
  @IsUUID('4')
  readonly id: string;

  @IsString()
  @Length(3, 50)
  readonly accountName: string;

  @IsString()
  @Length(3, 250)
  readonly sas: string;

  @IsString()
  readonly containerName: string;

  constructor(id: string, accountName: string, containerName: string, sas: string) {
    this.id = id;
    this.accountName = accountName;
    this.containerName = containerName;
    this.sas = sas;
  }
}
