require('dotenv').config();
import { expect } from 'chai';
import nock from 'nock';

import { UnsplashAPIClient } from '../src/lib';
// import type { Photo } from '../src/types';

import { response } from '../src/mock/photos';

const clientId = process.env.UNSPLASH_CLIENT_ID!;

nock('https://api.unsplash.com/')
  .get(/^\/search\/photos.*/)
  .reply(200, {
    ...response,
  });

describe('Unsplash API Client', () => {
  it('should create a new client correctly', () => {
    new UnsplashAPIClient(clientId);
  });

  it('should return a list of photos', async () => {
    const unsplashClient = new UnsplashAPIClient(clientId);
    const photos = await unsplashClient.search('aesthetic')!;
    expect(photos).to.exist;
  });
});
