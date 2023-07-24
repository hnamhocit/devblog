import clsx from 'clsx'
import { FC, ReactNode, memo } from 'react'

interface IContainer {
	children: ReactNode
	className?: string
}

const Container: FC<IContainer> = ({ children, className }) => {
	return <div className={clsx('px-4 md:px-7', className)}>{children}</div>
}

export default memo(Container)
