import {ISession} from 'connect-typeorm'
import { Column, Index, PrimaryColumn,Entity, DeleteDateColumn} from 'typeorm'

@Entity('sessions')
export class SessionEntity implements ISession{
    @Index()
    @Column('bigint')
    expiredAt= Date.now()

    @PrimaryColumn('varchar', {length:255})
    id=''

    @Column('text')
    json: string=''

    @DeleteDateColumn()
    destroyedAt?: null;
}