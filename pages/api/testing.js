
import getData from '../../firebase/db/getData';
import addData from '../../firebase/db/addData';

import AppUser from '../../model/appUser';

import getUser from '../../firebase/auth/currentUser'


export default async (req, res) => {
  try {
    const user = await getUser();
    console.log(user)
    const d = {
      trips:[{destination:"Hong Kong",from:"2025-06-10",to:"2025-06-17"}]
    }
    // const {result:addResult, error:addError} = await addData('user', 'user-id', d)
    // const {result:data, error:getError} = await getData('users','user-id')
    
    res.status(200).json( user );
  } catch (e) {
    console.log(e)
    res.status(400).end();
  }
}