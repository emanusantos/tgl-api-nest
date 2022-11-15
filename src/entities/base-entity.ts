import {
  BaseEntity as TypeBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<Model> extends TypeBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
    select: false,
  })
  updated_at: Date;

  @DeleteDateColumn({
    nullable: true,
    select: false,
  })
  deleted_at: Date;

  constructor(data: Partial<Model>) {
    super();
    Object.assign(this, data);
  }
}
