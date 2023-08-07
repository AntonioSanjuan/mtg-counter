/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeckCollectionState } from '../../state/deckCollection/models/appDeckCollection.state';

const getUserDeckCollectionResponseObj = { 
  id: 'testUserSettingsId',
  decks: []
 } as DeckCollectionState;

let loadingResponseMock: boolean = false;
let errorResponseMock: boolean = false;

const existsUserWithUserNameSpy = jest.fn();
const getUserWithUserNameDecksSpy = jest.fn();

const mockUserMockResponse = {
  existsUserWithUserName: existsUserWithUserNameSpy,
  getUserWithUserNameDecks: getUserWithUserNameDecksSpy,
  loading: loadingResponseMock,
  error: errorResponseMock,
}

export const mock = () => {
  return mockUserMockResponse;
}

export const initializeMock = () => {
  existsUserWithUserNameSpy.mockResolvedValue(false)
  getUserWithUserNameDecksSpy.mockResolvedValue(getUserDeckCollectionResponseObj)
}