/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React, { FunctionComponent, useEffect, useState, memo } from 'react'
import styled from '@emotion/styled'
import { Avatar } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import ContainerLoader from './ContainerLoader'
const companySilhouette = require('../../assets/images/onboarding/gray_m.svg')

interface Props {
  image?: string
  alt?: string
  length?: string
  onClick?: () => void
  disableCameraIcon?: boolean
}

const RoundAvatarContainer = styled.div`
  position: relative;
  margin-right: 1.875rem;
`
const CameraIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 2.25rem;
  height: 2.25rem;
  background-color: #fff;
  border-radius: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px #00000033;
  .icon-nav-digital-asset-manager {
    font-size: 1.063rem;
    cursor: pointer;
  }
`
const RoundRectAvatar: FunctionComponent<Props> = props => {
  const [imageLoading, setImageLoading] = useState(false)
  const {
    image,
    alt = '',
    length = '144px',
    onClick,
    disableCameraIcon
  } = props
  const handelOnClick = () => {
    onClick && onClick()
  }

  useEffect(() => {
    if (image) {
      handelOnImageChange()
    }
  }, [image])

  const handelOnImageLoad = () => {
    setImageLoading(false)
  }

  const handelOnImageChange = () => {
    setImageLoading(true)
  }

  return (
    <React.Fragment>
      <RoundAvatarContainer onClick={handelOnClick}>
        <Avatar
          css={css`
            min-width: ${length};
            width: ${length};
            height: ${length};
            border: 4px solid #fff;
            box-shadow: 0px 3px 6px #00000029;
            border: 4px solid white;
            background: #f5f8fa;
            cursor: pointer;
            border-radius: 20px;
          `}
        >
          <ContainerLoader size="md" showLoading={imageLoading} />
          <img
            onLoad={handelOnImageLoad}
            src={image || companySilhouette}
            alt={alt}
            css={css`
              object-fit: cover;
            `}
          />
        </Avatar>
        {!disableCameraIcon && (
          <CameraIcon className="uplodicon">
            <span className={'icon-nav-digital-asset-manager'} />
          </CameraIcon>
        )}
      </RoundAvatarContainer>
    </React.Fragment>
  )
}
export default memo(RoundRectAvatar)
