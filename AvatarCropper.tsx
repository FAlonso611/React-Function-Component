import React, { useState } from 'react'
import styled from '@emotion/styled'
import ReactCrop from 'react-image-crop'
import { Loader as LoaderR } from 'rsuite'
import 'react-image-crop/dist/ReactCrop.css'

interface Props {
  avatarImage: string
  crop: Crop
  setCropData: (data: Crop) => void
  setScale: (data: Scale) => void
  setLoadedData: (data: HTMLImageElement) => void
}

export interface Crop {
  aspect?: number
  x?: number
  y?: number
  width?: number
  height?: number
  unit?: 'px' | '%'
}

export interface Scale {
  scaleX: number
  scaleY: number
}

export interface AvatarCropperImageFunction {
  getImageDetails(): {
    imageURL: string
    crop: { x: number; y: number }
    canvas: HTMLCanvasElement
  }
}

const AvatarCropperContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 320px;
  background-color: #8a8a8a;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AvatarCropLoading = styled.div`
  position: relative;
  max-height: 320px;
`
const Loader = styled(LoaderR)`
  .rs-loader-spin {
    min-width: 1.125rem;
  }
`

const AvatarCropper = (props: Props) => {
  const { avatarImage, setCropData, crop, setLoadedData, setScale } = props
  const [imageLoaded, setImageLoaded] = useState(true)
  const onImageLoaded = (image: HTMLImageElement) => {
    setImageLoaded(false)
    setLoadedData(image)
    const aspect = 1

    let SquareCropSide = image.width

    if (image.width > image.height) {
      SquareCropSide = image.height
    }

    const SquareCropCenter = SquareCropSide / 2
    const imageXCenter = image.width / 2
    const imageYCenter = image.height / 2
    const y = imageYCenter - SquareCropCenter
    const x = imageXCenter - SquareCropCenter

    const cropData = {
      x,
      y,
      aspect
    }
    if (image.width > image.height) {
      setCropData({ ...cropData, unit: 'px', width: SquareCropSide })
    } else {
      setCropData({ ...cropData, unit: 'px', height: SquareCropSide })
    }
    setScale({
      scaleX: image.naturalWidth / image.width,
      scaleY: image.naturalHeight / image.height
    })
    return false
  }

  const onCropComplete = (cropData: Crop) => {
    setCropData(cropData)
  }

  const onCropChange = (cropData: Crop) => {
    setCropData(cropData)
  }

  return (
    <AvatarCropperContainer>
      <AvatarCropLoading>
        {imageLoaded && <Loader center content="loading" />}
        <ReactCrop
          minWidth={30}
          minHeight={30}
          circularCrop={true}
          keepSelection={true}
          ruleOfThirds={true}
          crossorigin={'anonymous'}
          style={{ maxHeight: '320px' }}
          imageStyle={{
            maxHeight: '320px',
            overflow: 'hidden',
            maxWidth: '100%'
          }}
          src={avatarImage}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      </AvatarCropLoading>
    </AvatarCropperContainer>
  )
}

export default AvatarCropper
