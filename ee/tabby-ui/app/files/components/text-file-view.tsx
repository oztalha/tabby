import React, { Suspense, useContext } from 'react'
import filename2prism from 'filename2prism'

import { TFileMeta } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ListSkeleton } from '@/components/skeleton'

import { BlobHeader } from './blob-header'
import { SourceCodeBrowserContext } from './source-code-browser'

const SourceCodeEditor = React.lazy(() => import('./source-code-editor'))

interface TextFileViewProps extends React.HTMLProps<HTMLDivElement> {
  blob: Blob | undefined
  meta: TFileMeta | undefined
  contentLength?: number
}

export const TextFileView: React.FC<TextFileViewProps> = ({
  className,
  blob,
  meta,
  contentLength
}) => {
  const [value, setValue] = React.useState<string>('')
  const { activePath } = useContext(SourceCodeBrowserContext)
  const detectedLanguage = activePath
    ? filename2prism(activePath)[0]
    : undefined
  const language = (meta?.language ?? detectedLanguage) || ''

  React.useEffect(() => {
    const blob2Text = async (b: Blob) => {
      try {
        const v = await b.text()
        setValue(v)
      } catch (e) {
        setValue('')
      }
    }

    if (blob) {
      blob2Text(blob)
    }
  }, [blob])

  return (
    <div className={cn(className)}>
      <BlobHeader
        blob={blob}
        contentLength={contentLength}
        canCopy
      ></BlobHeader>
      <div className="rounded-b-lg border border-t-0 p-2">
        <Suspense fallback={<ListSkeleton />}>
          <SourceCodeEditor value={value} meta={meta} language={language} />
        </Suspense>
      </div>
    </div>
  )
}
