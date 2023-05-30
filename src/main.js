import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_WEB_CLIENT_ID,
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
  },
})

const app = createApp(App)

app.use(router)

app.mount('#app')
