const crpyto = require('crypto');
const { json } = require('body-parser');



const tokenRepository = require('../repository/token.repository');

const tokenNotFoundError = require('../../../errors/token.errors/tokenNotFound');
const invalidTokenError = require('../../../errors/token.errors/invalidToken');


class tokenService{


    async findToken(tk){
        const token = await tokenRepository.findTokenByPK(tk);

        if(!token.Item){
            throw new tokenNotFoundError();
        }
        if(Date.now() > token.Item.expirationDate){
            throw new invalidTokenError();
        }
        return token.Item;
    }

    async createToken(email){
        
        const token = await crpyto.randomBytes(12).toString('base64');

        const invalidateNonExpiredToken = await tokenRepository.findEmailNonValidToken(email);
        
        if(invalidateNonExpiredToken.Count > 0){
            await tokenRepository.updateExpirationDate(invalidateNonExpiredToken.Items[0].token);
        }
          
        const newToken = await tokenRepository.createToken({
            token : token,
            email : email
        });
        return newToken;
    }

}

module.exports =  new tokenService();
