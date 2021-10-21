import { Box, Link, Image } from '@chakra-ui/react'

import { Separator } from '@/presentation/components'
import logoPurpleFontImg from '@/presentation/images/logo-purple-font.png'

type Props = {
  size?: string
}

export const Logo = ({ size = '150px' }: Props): JSX.Element => {
  return (
    <Box pt='25px' mb='12px'>
      <Link
        href='/#/'
        target='_blank'
        display='flex'
        lineHeight='100%'
        mb='30px'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        fontSize='11px'
      >
        <Image src={logoPurpleFontImg} alt='Facheck Logo' w={size} />
      </Link>
      <Separator />
    </Box>
  )
}
