import TOKEN_SECRET from "../config.js";
import json from 'jsonwebtoken'

export function createAccesToken(payload){
    return new Promise((resolve, reject) => {
        json.sign(
            payload
            , 
            TOKEN_SECRET, 
            {
                expiresIn : '1d'
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        )
    })
}