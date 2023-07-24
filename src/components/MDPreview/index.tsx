import '@uiw/react-markdown-preview/markdown.css'

import dynamic from 'next/dynamic'
import { FC, memo } from 'react'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
	ssr: false,
})

interface MDPreviewProps {
	source: string | undefined
}

const MDPreview: FC<MDPreviewProps> = ({ source }) => {
	return (
		<div data-color-mode='light'>
			<MarkdownPreview source={source} />
		</div>
	)
}

export default memo(MDPreview)
