/**  Service to generate JWT @@author :: Deeptaroop Maitra
 */
import jwt from "jsonwebtoken";
import TokenGenerator from "./token-generator";


export const sign = function (payload) {
        const tokenGenerator = new TokenGenerator('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false })
        return tokenGenerator.sign({ data: payload }, { audience: payload, issuer: payload, jwtid: '1', subject: 'user' })
    }

export const verify = async function (token, callback) {
       
        jwt.verify(token, 'Test', callback);
    }

export const refreshToken = function (token, payload) {
        const tokenGenerator = new TokenGenerator('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false })
        return tokenGenerator.refresh(token, { verify: { audience: payload, issuer: payload }, jwtid: '2' })
}


