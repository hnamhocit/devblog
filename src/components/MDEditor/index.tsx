import '@uiw/react-md-editor/markdown-editor.css'

import { PreviewType } from '@uiw/react-md-editor'
import dynamic from 'next/dynamic'
import { Dispatch, FC, SetStateAction, memo } from 'react'

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
	ssr: false,
})

interface MDEditorProps {
	value: string
	onChange: Dispatch<SetStateAction<string>>
	preview?: PreviewType
}

const MDEditor: FC<MDEditorProps> = ({ value, onChange, preview = 'edit' }) => {
	const handleChange = (value: string | undefined) => onChange(value ?? '')

	return (
		<div data-color-mode='light'>
			<MarkdownEditor
				value={value}
				onChange={handleChange}
				preview={preview}
			/>
		</div>
	)
}

export default memo(MDEditor)
