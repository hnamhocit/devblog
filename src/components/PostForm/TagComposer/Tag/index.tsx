import Link from 'next/link'
import { FC, memo } from 'react'
import { styled } from 'styled-components'

import { TagInput } from '@/types/tagInput'
import { hexToRgba } from '@/utils/color'

interface TagProps {
	tag: TagInput
	size?: 'sm' | 'normal'
}

const StyledTag = styled(Link)<{ $color: string; $size?: 'sm' | 'normal' }>`
	display: block;
	padding: 0.25rem;
	font-weight: medium;
	border: 1px solid transparent;
	border-top-width: 2px;
	border-left-width: 2px;
	border-radius: 6px;
	transition: all 0.2s ease-in-out;
	font-size: ${(props) => (props.$size === 'sm' ? '0.875rem' : '1rem')};
	line-height: ${(props) => (props.$size === 'sm' ? '1.25rem' : '1.5rem')};

	&:hover {
		border-color: ${(props) => props.$color};
		background-color: ${(props) => hexToRgba(props.$color, 0.1)};
	}
`

const Tag: FC<TagProps> = ({ tag, size = 'sm' }) => {
	return (
		<StyledTag $size={size} $color={tag.color} href={`/tags/${tag.name}`}>
			<span style={{ color: tag.color }}># </span>
			{tag.name}
		</StyledTag>
	)
}

export default memo(Tag)
