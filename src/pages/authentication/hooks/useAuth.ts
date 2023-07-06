import {IUser} from '@shared/interfacesAndTypes';
import {useEffect, useState} from 'react';

interface params {
    requestFn: (login: string, password: string) => Promise<any>,
    successResponseHandler: (user: IUser) => void
    failedRequestHandler: (error: string) => void
}

type returnValue = [(login: string, password: string) => Promise<void>, boolean, boolean]

const useAuth = (requestFn: params['requestFn'],
    successResponseHandler: params['successResponseHandler'],
    failedRequestHandler: params['failedRequestHandler']): returnValue => {
  const [isPending, setIsPending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [minTimePassed, setMinTimePassed] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)

  const keepLoading = isPending || !minTimePassed


  useEffect(() => {
    if (!keepLoading && user) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        successResponseHandler(user)
      }, 950)
    }
  }, [keepLoading])

  const loginHandler = async (login: string, password: string) => {
    setIsPending(true)
    setMinTimePassed(false)

    setTimeout(() => {
      setMinTimePassed(true)
    }, 1000)

    try {
      const user = await requestFn(login, password)
      setIsPending(false)
      setUser(user)

      //@ts-ignore
    } catch (error: string) {
      setMinTimePassed(true)
      setIsPending(false)
      failedRequestHandler(error)
    }
  };

  return [loginHandler, keepLoading, showSuccess]
}

export default useAuth;
