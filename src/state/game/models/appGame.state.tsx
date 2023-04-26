import { FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';

export interface GameState extends FirebaseGameDto {
    id: string | undefined;
}
