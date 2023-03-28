import { FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';

export interface GameState extends FirebaseGameDto {
    id: string | undefined;
}
