import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm'

@Entity({ name: 'activations' })
export class Activation {
  @PrimaryColumn()
  user_id: number

  @Column()
  code: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
