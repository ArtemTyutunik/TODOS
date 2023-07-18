import {useGoogleLogin} from '@react-oauth/google';

const useGoogleAccount = (requestFunction: (userAccount: unknown) => void) => {
  return useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userAccount = await (await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
          },
        })).json()

        requestFunction(userAccount)
      } catch (e) {
        console.log(e)
      }
    },
  })
}

export default useGoogleAccount;
