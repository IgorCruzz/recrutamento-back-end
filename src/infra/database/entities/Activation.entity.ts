import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm'
import { User } from './User.entity'

@Entity({ name: 'activations' })
export class Activation {
  @PrimaryColumn()
  user_id: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  code: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
