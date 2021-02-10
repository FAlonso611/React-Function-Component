/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { FunctionComponent, useCallback, useRef } from 'react'
import { Uploader } from 'rsuite'
import styled from '@emotion/styled'
import 'rsuite/dist/styles/rsuite-default.css'
import {
  FlexCenter,
  ErrorMsg,
  boxModel,
  FlexBetween,
  ButtonWrapper
} from '../../utils/style'
import variables from '../../assets/styles/variables'
import { FileType } from 'rsuite/lib/Uploader'
import Button from './Button'

const { Fonts, Colors } = variables

const UPLOAD_AVATAR = require('../../assets/images/onboarding/upload_avatar.svg')

const ImgErrorMsg = styled.div`
  & > div {
    margin: 0;
    font-weight: normal;
  }
`

interface Props {
  setFile: (data: File) => void
  imageFile?: File
  onUpload: (uploading: boolean) => void
  photoSizeInMB?: number
  infoText?: string
  handelOnRemovePhoto?: () => void
  showDeleteCurrentPhoto?: boolean
  customFilename?: string
  setUrl: (data: string | ArrayBuffer) => void
  handleCancle?: () => void
  handelSetPhoto?: () => void
}

const ImageUploadContainer = styled.span`
  flex-direction: column;
  .upload-avatar {
    width: 100px;
    height: 100px;
    background: #ebf0f4;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
`

const ImageUploadContent = styled.div`
  width: 100%;
`

const DeleteCurrentPhotoContainer = styled.div``

const DeleteCurrentPhotoButton = styled.button`
  color: #3469c7;
  font-size: 0.875rem;
  letter-spacing: 0.28px;
  font-family: roboto;
  background-color: transparent;
  line-height: 0.875rem;
  padding: 0;
  &:focus {
    outline: none;
  }
`

const UploadPopupButtons = styled.div``

const checkForMinImageDimension = (file: Blob) => {
  return new Promise<boolean>((resolve, reject) => {
    if (typeof file != 'undefined') {
      let reader = new FileReader()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = function (event: any) {
        var image = new Image()
        image.src = event.target.result
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image.onload = function (imageEvent: any) {
          const { height } = imageEvent.target
          const { width } = imageEvent.target
          if (height < 512 || width < 512) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onerror = function (event: any) {
        reject(event)
      }
      reader.readAsDataURL(file)
    }
  })
}

const ImageUploaded: FunctionComponent<Props> = props => {
  const {
    setFile,
    imageFile,
    onUpload,
    photoSizeInMB = 1,
    handelOnRemovePhoto,
    showDeleteCurrentPhoto,
    setUrl,
    handleCancle,
    handelSetPhoto
  } = props

  const [error, setError] = React.useState(false)
  const [
    minimumImageDimensionError,
    setMinimumImageDimensionError
  ] = React.useState(false)
  const [wrongImageFormateError, setWrongImageFormateError] = React.useState(
    false
  )
  const inputEl = useRef(null)

  const removePhoto = useCallback(() => {
    if (imageFile) {
      setError(false)
      setWrongImageFormateError(false)
      setMinimumImageDimensionError(false)
      setFile(null)
      setUrl(null)
      if (
        inputEl &&
        inputEl.current &&
        inputEl.current.inputRef &&
        inputEl.current.inputRef.current &&
        inputEl.current.inputRef.current.inputRef
      ) {
        inputEl.current.inputRef.current.inputRef.current.value = ''
      }
    }
    if (showDeleteCurrentPhoto && handelOnRemovePhoto) handelOnRemovePhoto()
  }, [
    setError,
    setUrl,
    setFile,
    imageFile,
    handelOnRemovePhoto,
    showDeleteCurrentPhoto
  ])

  const handelUploaderOnChange = useCallback(
    async (fileList: FileType[]) => {
      setError(false)
      setWrongImageFormateError(false)
      setMinimumImageDimensionError(false)
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i

      await checkForMinImageDimension(fileList[fileList.length - 1].blobFile)
        .then((hasMinimumDimension: boolean) => {
          if (!hasMinimumDimension) {
            if (
              fileList[fileList.length - 1].blobFile.size >=
              photoSizeInMB * 1000000
            ) {
              setError(true)
            } else if (
              !allowedExtensions.exec(fileList[fileList.length - 1].name)
            ) {
              setWrongImageFormateError(true)
            } else {
              onUpload(true)
              setFile(fileList[fileList.length - 1].blobFile)
              const reader = new FileReader()
              reader.readAsDataURL(fileList[fileList.length - 1].blobFile)
              reader.onloadend = function () {
                setUrl(reader.result)
              }
              onUpload(false)
            }
          } else setMinimumImageDimensionError(true)
        })
        .catch(() => {})
    },
    [photoSizeInMB, onUpload, setFile, setUrl]
  )

  return (
    <ImageUploadContent>
      <div css={FlexCenter} className="mb-20">
        <div style={{ position: 'relative', width: `100%` }}>
          {!imageFile && (
            <Uploader
              circularCrop={true}
              fileListVisible={false}
              listType="picture"
              ref={inputEl}
              accept="image/x-png,image/svg,image/jpeg,image/png"
              autoUpload={false}
              onChange={handelUploaderOnChange}
              onUpload={() => {
                onUpload(true)
              }}
              onSuccess={() => {
                onUpload(false)
              }}
              onError={() => {
                setFile(null)
                setUrl(null)
                onUpload(false)
              }}
              draggable
            >
              <ImageUploadContainer>
                <div className="upload-avatar">
                  <img src={UPLOAD_AVATAR} alt="upload-avatar" />
                </div>
                <span>
                  Drag your image here or{' '}
                  <span
                    style={{
                      color: Colors.Blue[200],
                      fontWeight: Fonts.Weight.Medium
                    }}
                  >
                    browser
                  </span>{' '}
                  to upload
                </span>
              </ImageUploadContainer>
            </Uploader>
          )}
          <ImgErrorMsg>
            {error && (
              <ErrorMsg key={'uploadSizeError'}>
                {`Max photo size to upload is ${photoSizeInMB}MB`}
              </ErrorMsg>
            )}
            {wrongImageFormateError && (
              <ErrorMsg key={'uploadFormateError'}>
                {`Your photo should be a PNG, JPG, or SVG `}
              </ErrorMsg>
            )}
            {minimumImageDimensionError && (
              <ErrorMsg key={'uploadFormateError'}>
                {`Your photo should be a minimum image size of 512px by 512px `}
              </ErrorMsg>
            )}
          </ImgErrorMsg>
          {(showDeleteCurrentPhoto || imageFile) && (
            <div
              css={FlexBetween}
              style={{
                alignItems: 'flex-start',
                paddingTop: `${boxModel('50px', true)}`
              }}
            >
              <DeleteCurrentPhotoContainer>
                <DeleteCurrentPhotoButton onClick={removePhoto}>
                  Delete Current Photo
                </DeleteCurrentPhotoButton>
              </DeleteCurrentPhotoContainer>
              <UploadPopupButtons
                css={ButtonWrapper}
                className="justify-content-end"
              >
                <Button className="cancelbtn" onClick={handleCancle}>
                  Cancel
                </Button>
                <Button className="actionbtn" onClick={handelSetPhoto}>
                  Set Photo
                </Button>
              </UploadPopupButtons>
            </div>
          )}
        </div>
      </div>
    </ImageUploadContent>
  )
}

export default ImageUploaded
