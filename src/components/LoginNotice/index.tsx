import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import {
	selectLoginNotice,
	toggleShow,
} from '@/store/reducers/loginNoticeSlice'
import Modal from '../Modal'

const LoginNotice = () => {
	const { show } = useSelector(selectLoginNotice)
	const dispatch = useAppDispatch()

	const handleClick = () => dispatch(toggleShow())

	return (
		<Modal open={show} onClose={handleClick}>
			<div>
				<Typography variant='h5' fontWeight={700}>
					Log in to continue
				</Typography>

				<Typography>
					Every article is an opportunity to renew our world🥰
				</Typography>
			</div>

			<div className='mt-9'>
				<Link href='/enter'>
					<Button fullWidth variant='contained' onClick={handleClick}>
						Login
					</Button>
				</Link>

				<Link href='/enter?state=new-user'>
					<Button fullWidth onClick={handleClick}>
						Sign up
					</Button>
				</Link>
			</div>
		</Modal>
	)
}

export default LoginNotice
