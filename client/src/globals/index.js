import {
  GlobalContext
} from './globalContext.js';

import {
  proxyServer,
  guestUserId,
  frontendLinks,
  backendRoutes
} from './variables.js';

import {
  isBrowserIE,
  isObjectEmpty,
  cloneObjByValue
} from './functions.js';

export {
  // globalContext
  GlobalContext,

  // variables
  proxyServer,
  guestUserId,
  frontendLinks,
  backendRoutes,

  // functions
  isBrowserIE,
  isObjectEmpty,
  cloneObjByValue
}