import { act, renderHook } from '@testing-library/react-hooks';
import { Dispatch } from '@reduxjs/toolkit';
import { getNewGame } from './gameFactory';
import { Lifes, MaxCommanderDamage, MaxPoisonCounters } from '../../../models/internal/types/LifeEnum.model';
import { NumberOfPlayers } from '../../../models/internal/types/NumberOfPlayerEnum.model';
import { getDefaultPlayerCounters, getDefaultPlayers } from './playerFactory';
import { FirebaseCounterDto, FirebasePlayerDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';

describe('PlayerFactory', () => {
    let sutCounters: FirebaseCounterDto[] = [];

    beforeEach(() => {
        sutCounters = getDefaultPlayerCounters(Lifes.Thirty)
    });
  
    it('getDefaultPlayerCounters call should have 30 Life counters', () => {
        expect(sutCounters.filter((counter) => {
            return counter.type === "Life"
        })[0].value)
        .toEqual(Lifes.Thirty)
    });

    it('getDefaultPlayerCounters call should have 10 Poison counters', () => {
        expect(sutCounters.filter((counter) => {
            return counter.type === "Poison"
        })[0].value)
        .toEqual(MaxPoisonCounters)
    });

    it('getDefaultPlayerCounters call should have 21 CommanderDamage counters', () => {
        expect(sutCounters.filter((counter) => {
            return counter.type === "CommanderDamage"
        })[0].value)
        .toEqual(MaxCommanderDamage)
    });

    it('getDefaultPlayers call should return 4 players with 30 lifes each', () => {
        const sutPlayers = getDefaultPlayers(Lifes.Thirty, NumberOfPlayers.Four)
    
        expect(sutPlayers.length).toEqual(NumberOfPlayers.Four)
        sutPlayers.forEach((sutPlayer) => {
            expect(sutPlayer.id).toBeDefined()
            expect(sutPlayer.counters.find((counter) => {return counter.type === "Life"})?.value).toEqual(Lifes.Thirty)
        })
    });
});