import { IoMdHome } from 'react-icons/io'

import { makeLogin, makeSignUp } from '@/main/factories/pages'
import { CustomRouteProps } from '@/presentation/components'
import { Home } from '@/presentation/pages'

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
    component: Home,
    icon: <IoMdHome />,
    isPrivate: true,
  },
]
