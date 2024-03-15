import React from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'

import { MemoizedReactMarkdown } from '@/components/markdown'

interface MarkdownViewProps {
  value: string
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ value }) => {
  return (
    <div className='py-4 px-10'>
      <MemoizedReactMarkdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-img:max-w-full prose-a:text-primary prose-h1:border-b prose-h1:pb-2 prose-h2:border-b prose-h2:pb-2 prose-full-width prose-img:w-auto"
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw]}
      >
        {value}
      </MemoizedReactMarkdown>
    </div>
  )
}

export default MarkdownView
