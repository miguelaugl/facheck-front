import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { LoadMonitorings } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { AdminLayout } from '@/presentation/layouts'

import { MonitoringItem } from './monitoring-item/monitoring-item'

type Props = {
  loadMonitorings: LoadMonitorings
}

export const Home = ({ loadMonitorings }: Props): JSX.Element => {
  const handleError = useErrorHandler((error) => {
    setState((prevState) => ({ ...prevState, error: error.message }))
  })
  const [state, setState] = useState({
    monitorings: [] as LoadMonitorings.Result,
    error: '',
  })
  useEffect(() => {
    loadMonitorings
      .load()
      .then((monitorings) => setState((prevState) => ({ ...prevState, monitorings })))
      .catch(handleError)
  }, [])
  return (
    <AdminLayout>
      <Text fontSize='2xl' fontWeight='medium' mb='4'>
        Monitorias
      </Text>
      {!!state.error && (
        <Text color='red.500' data-testid='error'>
          {state.error}
        </Text>
      )}
      {!state.error && (
        <Flex as='ul' data-testid='monitoring-list'>
          {state.monitorings.map((monitoring) => (
            <MonitoringItem key={monitoring.id} monitoring={monitoring} />
          ))}
        </Flex>
      )}
    </AdminLayout>
  )
}
