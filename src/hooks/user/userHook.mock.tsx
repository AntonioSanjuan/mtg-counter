/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { FirebaseUserDto } from '../../models/dtos/firebaseStore/firebaseUser.model';

const getUserResponseObj = { 
  id: 'testUserSettingsId',
  data: () => {
    return {
      currentGame: {
        id: 'testCurrentGameId'
      },
      historicGames: {
        id: 'testHistoricGamesId'
      },
      deckCollection: {
        id: 'testDeckCollectionsId'
      }
    } as Partial<FirebaseUserDto>
} } as DocumentSnapshot<DocumentData>;

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

const getUserSpy = jest.fn();
const setUserSpy = jest.fn();
const updateUserSpy = jest.fn();
const updateUserCurrentGameSpy = jest.fn();
const setAnonymousUserSpy = jest.fn();

const mockUserMockResponse = {
  getUser: getUserSpy,
  setUser: setUserSpy,
  setAnonymousUser: setAnonymousUserSpy,
  updateUser: updateUserSpy,
  updateUserCurrentGame: updateUserCurrentGameSpy,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const mock = () => {
  return mockUserMockResponse;
}

export const initializeMock = () => {
  getUserSpy.mockResolvedValue(getUserResponseObj)
  setUserSpy.mockResolvedValue(getUserResponseObj)
  setAnonymousUserSpy.mockResolvedValue(undefined)
  updateUserSpy.mockResolvedValue(getUserResponseObj)
  updateUserCurrentGameSpy.mockResolvedValue(getUserResponseObj)
}