import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm'
import { User } from './User.entity'

@Entity({ name: 'activations' })
export class Activation {
  @PrimaryColumn()
  user_id: number

  @JoinColumn({ name: 'users' })
  user: User

  @Column()
  code: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
