import { FirebaseBoardDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';

export interface GameState {
    id: string | undefined;
    finished: boolean;
    name?: string;
    board: FirebaseBoardDto;
    createdAt: Date;
    finishAt?: Date;
}
