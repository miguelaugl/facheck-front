import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Text, Button, Grid } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'

import { LoadMonitorings } from '@/domain/usecases'
import { Input } from '@/presentation/components'
import { eventEmitter, Events } from '@/presentation/event-emitter'
import { useErrorHandler } from '@/presentation/hooks'
import { AdminLayout } from '@/presentation/layouts'

import { MonitoringItem } from './monitoring-item/monitoring-item'

type Props = {
  loadMonitorings: LoadMonitorings
}

const fullDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const Home = ({ loadMonitorings }: Props): JSX.Element => {
  const [search, setSearch] = useState('')
  const handleError = useErrorHandler((error) => {
    setState((prevState) => ({ ...prevState, error: error.message }))
  })
  const [state, setState] = useState({
    monitorings: [] as LoadMonitorings.Result,
    error: '',
    reload: false,
  })
  const handleReload = (): void => {
    setState((prevState) => ({ ...prevState, reload: !prevState.reload, error: '' }))
  }
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    loadMonitorings
      .load()
      .then((monitorings) => setState((prevState) => ({ ...prevState, monitorings })))
      .catch(handleError)
  }, [state.reload])
  useEffect(() => {
    const unsubscribe = eventEmitter.subscribe(Events.ADD_MONITORING, () => {
      handleReload()
    })
    return () => {
      unsubscribe()
    }
  }, [])
  const filteredMonitorings = state.monitorings.filter((monitoring) => {
    const checkIfInclude = (value: string): boolean => {
      const lowerCaseSearch = search.toLowerCase()
      return value.toLowerCase().includes(lowerCaseSearch)
    }
    const {
      initHour,
      endHour,
      monitor: { name },
      room,
      subject,
      weekday,
    } = monitoring
    return (
      checkIfInclude(fullDays[weekday]) ||
      checkIfInclude(initHour) ||
      checkIfInclude(endHour) ||
      checkIfInclude(name) ||
      checkIfInclude(room) ||
      checkIfInclude(subject)
    )
  })
  return (
    <AdminLayout>
      <Text as='h2' fontSize='xl' fontWeight='medium' mb='4'>
        Monitorias
      </Text>
      <Input label='Pesquisar' leftIcon={<SearchIcon />} value={search} onChange={onSearchChange} maxWidth='400px' mb='16px' />
      {!!state.error && (
        <Flex align='center' justify='center' direction='column' py='8'>
          <Text fontWeight='medium' fontSize='xl' data-testid='error' mb='4'>
            {state.error}
          </Text>
          <Button data-testid='reload' onClick={handleReload}>
            Tentar novamente
          </Button>
        </Flex>
      )}
      {!state.error && (
        <Grid as='ul' data-testid='monitoring-list' templateColumns='repeat(auto-fill, minmax(250px, 1fr))' gap={4}>
          {filteredMonitorings.map((monitoring) => (
            <MonitoringItem key={monitoring.id} monitoring={monitoring} />
          ))}
        </Grid>
      )}
    </AdminLayout>
  )
}
