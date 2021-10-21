import { Flex, Text, Avatar } from '@chakra-ui/react'
import { useEffect } from 'react'

import { LoadMonitorings } from '@/domain/usecases'
import { AdminLayout } from '@/presentation/layouts'

type Props = {
  loadMonitorings: LoadMonitorings
}

export const Home = ({ loadMonitorings }: Props): JSX.Element => {
  useEffect(() => {
    loadMonitorings
      .load()
      .then(() => {})
      .catch(() => {})
  }, [])
  return (
    <AdminLayout>
      <Text fontSize='2xl' fontWeight='medium' mb='4'>
        Monitorias
      </Text>
      <Flex as='ul'>
        {[...new Array(1).keys()].map((_: any, index: number) => (
          <Flex
            key={index}
            flex='0 0 250px'
            borderRadius='15px'
            bg='white'
            alignItems='center'
            direction='column'
            p='24px 35px'
            boxShadow='rgb(0 0 0 / 2%) 0px 3.5px 5.5px'
            mr='4'
          >
            <Avatar size='xl' name='Miguel Freitas' mb='4' bg='purple.500' />
            <Text>Miguel Freitas</Text>
            <Text fontSize='lg' fontWeight='medium'>
              Programação
            </Text>
            <Text>Quarta-feira</Text>
            <Text fontSize='sm'>Das 12:00h até 14:00h</Text>
          </Flex>
        ))}
      </Flex>
    </AdminLayout>
  )
}
