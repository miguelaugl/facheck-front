import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { LoadMonitorings } from '@/domain/usecases'
import { AdminLayout } from '@/presentation/layouts'

import { MonitoringItem } from './monitoring-item/monitoring-item'

type Props = {
  loadMonitorings: LoadMonitorings
}

export const Home = ({ loadMonitorings }: Props): JSX.Element => {
  const [monitorings, setMonitorings] = useState([] as LoadMonitorings.Result)
  useEffect(() => {
    loadMonitorings
      .load()
      .then(setMonitorings)
      .catch(() => {})
  }, [])
  return (
    <AdminLayout>
      <Text fontSize='2xl' fontWeight='medium' mb='4'>
        Monitorias
      </Text>
      <Flex as='ul' data-testid='monitoring-list'>
        {monitorings.map((monitoring) => (
          <MonitoringItem key={monitoring.id} monitoring={monitoring} />
        ))}
      </Flex>
    </AdminLayout>
  )
}
