import { NavLink, useLocation } from 'react-router-dom'

import { LinkButton } from './link-button'

type Props = {
  path: string
  label: string
  icon?: string | React.ReactNode
}

export const SidebarLink = ({ path, label, icon }: Props): JSX.Element => {
  const location = useLocation()
  const isCurrentRoute = location.pathname === path
  return (
    <NavLink to={path}>
      <LinkButton text={label} icon={icon} isActive={isCurrentRoute} />
    </NavLink>
  )
}
