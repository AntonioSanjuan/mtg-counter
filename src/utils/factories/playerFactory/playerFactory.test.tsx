import { Lifes, MaxCommanderDamage, MaxPoisonCounters } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { getDefaultPlayers, getRestartedPlayerCounters } from './playerFactory';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGame.model';

describe('PlayerFactory', () => {
    const ownerUserName: string = 'ownerUserNameTest'
    let sutNumberOfPlayers: NumberOfPlayers
    let sutCounters: FirebaseCounterDto[] = [];
    let sutPlayers: FirebasePlayerDto[] = [];

    beforeEach(() => {
        sutNumberOfPlayers = NumberOfPlayers.Four;
        sutPlayers = getDefaultPlayers(Lifes.Thirty, NumberOfPlayers.Four, ownerUserName)
        sutCounters = sutPlayers[0].counters
    });
  
    it('getDefaultPlayerCounters call should have 30 Life counter value', () => {
        expect(sutCounters.filter((counter) => {
            return counter.type === "Life"
        })[0].value)
        .toEqual(Lifes.Thirty)
    });

    it('getDefaultPlayerCounters call should have 10 Poison counter value', () => {
        expect(sutCounters.filter((counter) => {
            return counter.type === "Poison"
        })[0].value)
        .toEqual(MaxPoisonCounters)
    });

    it('getDefaultPlayerCounters call should have 21 CommanderDamage counter value', () => {
        expect(sutCounters.filter((counter) => {
            return counter.type === "CommanderDamage"
        })[0].value)
        .toEqual(MaxCommanderDamage)
    });

    it('getDefaultPlayerCounters call should have 3 CommanderDamage counters', () => {
        expect(sutCounters.filter((counter) => {
            return counter.type === "CommanderDamage"
        }).length)
        .toEqual(sutNumberOfPlayers - 1)
    });

    it('getDefaultPlayers call should return 4 players with 30 lifes each', () => {
        expect(sutPlayers.length).toEqual(NumberOfPlayers.Four)
        sutPlayers.forEach((sutPlayer) => {
            expect(sutPlayer.id).toBeDefined()
            expect(sutPlayer.counters.find((counter) => {return counter.type === "Life"})?.value).toEqual(Lifes.Thirty)
        })
    });

    it('getDefaultPlayers call should return first player as owner with his own ownerUserName', () => {
        expect(sutPlayers[0].owner).toBeTruthy()
        expect(sutPlayers[0].name).toEqual(ownerUserName)
        expect(sutPlayers[0].userId).toEqual(ownerUserName)
    });

    it('getRestartedPlayerCounters call should return restarted player counters', () => {
        const sutRestartedLifes = Lifes.Thirty
        sutCounters.map((counter) => counter.value = 0)
        const newPlayerCounters = getRestartedPlayerCounters(sutCounters, sutRestartedLifes)
        expect(newPlayerCounters.find((counter) => counter.type === "Life")?.value).toEqual(sutRestartedLifes)
        expect(newPlayerCounters.find((counter) => counter.type === "CommanderDamage")?.value).toEqual(MaxCommanderDamage)
        expect(newPlayerCounters.find((counter) => counter.type === "Poison")?.value).toEqual(MaxPoisonCounters)
    });
});