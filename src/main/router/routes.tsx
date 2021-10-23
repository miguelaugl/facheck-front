import { IoIosHome } from 'react-icons/io'

import { makeHome, makeLogin, makeSignUp } from '@/main/factories/pages'
import { CustomRouteProps } from '@/presentation/components'

export const routes: CustomRouteProps[] = [
  {
    path: '/login',
    name: 'Login',
    component: makeLogin,
  },
  {
    path: '/signup',
    name: 'Cadastro',
    component: makeSignUp,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: makeHome,
    icon: <IoIosHome />,
    isPrivate: true,
  },
]
