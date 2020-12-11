import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Generated,
} from 'typeorm'
import { User } from './User.entity'

@Entity({ name: 'resetpasswords' })
export class ResetPassword {
  @PrimaryColumn()
  user_id: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Column()
  @Generated('uuid')
  reset_token: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}
