const jwt = require('jsonwebtoken')
const RefreshModel = require('../models/refreshToken.model')
const createError = require('http-errors')

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token, id) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      if (decoded.id !== id) {
        return false
      }
      return decoded
    } catch (err) {
      next(createError.Unauthorized());
    }
  }

  async setTokensInCookie(res, tokens) {
    res.cookie('aicte-access-token', tokens.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.cookie('aicte-refresh-token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  async storeRefreshToken(roleId, refreshToken) {
    const refreshTokenDoc = await RefreshModel.findOne({ role_id: roleId });
    if (refreshTokenDoc) {
      refreshTokenDoc.token = refreshToken;
      return await refreshTokenDoc.save();
    } else {
      return await RefreshModel.create({
        role_id: roleId,
        token: refreshToken,
      });
    }
  }
}

module.exports = new TokenService();
