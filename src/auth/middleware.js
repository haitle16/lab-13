'use strict';

import User from './model.js';

export default (req, res, next) => {

  try {

    ////////////////////////////////////////////////////////////
    // let authHeader = req.headers.authorization;
    // let base64Header = authHeader.replace(/Basics\s+/,'');
    // let base64Buffer = Buffer.from(base64Header, 'base64');
    // let bufferString = base64Buffer.toString();
    // let [username,password] = bufferString.split(':');
    // let auth = {username,password};

    ////////////////////////////////////////////////////////////

    // let auth = {};
    let authHeader = req.headers.authorization;
    // console.log(authHeader);
    // BASIC Auth
    if(authHeader.match(/basic/i)) {
      // Create a {user:password} object to send into the model to authenticate the user LOOK ABOVE!!!!
      let authHeader = req.headers.authorization;
      let base64Header = authHeader.replace(/Basic\s+/,'');
      let base64Buffer = Buffer.from(base64Header, 'base64');
      let bufferString = base64Buffer.toString();
      let [username,password] = bufferString.split(':');
      let auth = {username,password};
      console.log(auth);


      // Start the authentication train
      User.authenticateBasic(auth)
        .then(user=>_authenticate(user))
        .catch(_authError);
    }
    // BEARER Auth
    else if(authHeader.match(/bearer/i)) {
      ////////////////////////////////////////////////////////////
      let token = authHeader.replace(/bearer\s+/i, '');
      // console.log(authHeader);
      console.log(token);
      // to use do http post :3000/signin 'Authorization: Bearer {paste the auth in}
      //
      ////////////////////////////////////////////////////////////
      // Send the bearer token to the model to authenticate the user
      User.authenticateToken(token)
        .then(user=>_authenticate(user))
        .catch(_authError);
    }
    else { _authError(); }

  } catch(e) {
    _authError(e);
  }

  function _authenticate(user) {
    if(!user) { _authError(); }
    else {
      // Send the user and token back to the request
      ////////////////////////////////////////////////////////////
      req.user = user;
      ////////////////////////////////////////////////////////////
      next();
    }
  }

  // In all cases, force a server error ...
  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }

};

