'use strict';

const setupBaseService = require('./base.service');
const uuidGenerator = require('uuid/v4');

module.exports = function setupAuthCodesService(adminInstance, dbInstance) {

  const collection = dbInstance.collection('auth_codes');
  const baseService = new setupBaseService();

  async function filterBy(filterBy) {
    return await collection.where(filterBy.key, '==', filterBy.value).get();
  }

  function getUserId(authCodeRef) {
    const authCodeData = authCodeRef.docs[0];
    return authCodeData.data().uid;
  }

  async function createCustomToken(userId) {
    const additionalClaims = {
      alexa: true
    };
    return await adminInstance.createCustomToken(userId, additionalClaims);
  }

  function getTokenData(accessToken, refreshToken) {
    const expiresIn = 5 * 60;
    return {
      'access_token': accessToken,
      'token_type': 'Bearer',
      'refresh_token': refreshToken,
      'expires_in': expiresIn,
      'id_token': ''
    };
  }

  async function getAccessTokenByAuthCode(code) {
    try {
      const authCodeRef = await filterBy({
        key: 'code',
        value: code
      });

      if (authCodeRef.empty) {
        baseService.returnData.responseCode = 404;
        baseService.returnData.message = '';
        return baseService.returnData;
      }

      const userId = getUserId(authCodeRef);

      const accessToken = await createCustomToken(userId);
      const refreshToken = uuidGenerator();

      await collection.doc(userId).update({
        'access_token': accessToken,
        'refresh_token': refreshToken
      });

      baseService.returnData.responseCode = 200;
      baseService.returnData.data = getTokenData(accessToken, refreshToken);

    } catch (err) {
      const errorMessage = 'Error getting auth code';
      console.error(errorMessage, err);
      baseService.returnData.responseCode = 500;
      baseService.returnData.message = errorMessage;
    }

    return baseService.returnData;
  }

  async function getAccessTokenByRefreshToken(refreshToken) {

    try {
      const authCodeRef = await filterBy({
        key: 'refresh_token',
        value: refreshToken
      });

      if (authCodeRef.empty) {
        baseService.returnData.responseCode = 404;
        baseService.returnData.message = '';
        return baseService.returnData;
      }

      const userId = getUserId(authCodeRef);

      const accessToken = await createCustomToken(userId);

      await collection.doc(userId).update({
        'access_token': accessToken
      });

      baseService.returnData.responseCode = 200;
      baseService.returnData.data = getTokenData(accessToken, refreshToken);

    } catch (err) {
      const errorMessage = 'Error getting token by refresh token';
      console.error(errorMessage, err);
    }

    return baseService.returnData;
  }

  return {
    getAccessTokenByAuthCode,
    getAccessTokenByRefreshToken
  };
};