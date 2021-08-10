const proxyServer = process.env.NODE_ENV === "dev" ? "" :
(process.env.NODE_ENV === "integ" ? process.env.REACT_APP_INTEG_PROXY_SERVER :
  (process.env.NODE_ENV === "acpt" ? process.env.REACT_APP_ACPT_PROXY_SERVER :
    (process.env.NODE_ENV === "prod" ? process.env.REACT_APP_PROD_PROXY_SERVER :
      process.env.REACT_APP_DEPLOY_PROXY_SERVER)));
const guestUserId = 0;

// externalUrls = {}

const frontendLinks = {
  homeLogin: "/login",
  home: "/"
}

const backendRoutes = {
  users: {
    login: 'users/login'
  },
  todos: {
    all: 'todos',
    add: 'todos'
  }
}

export {
  proxyServer,
  guestUserId,
  frontendLinks,
  backendRoutes
}