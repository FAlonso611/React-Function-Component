/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Uploader as RUploader, Loader } from 'rsuite'
import styled from '@emotion/styled'
import variables from '../../assets/styles/variables'
import { ReactComponent as AvatarIcon } from '../../../assets/icons/nav-connections.svg'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'

import rfs, {
  FlexStart,
  boxModel,
  convertLineHeightToCss,
  convertPxToAbs,
  ErrorMsg
} from '../../utils/style'

const { Colors, DropShadow, Fonts } = variables

function previewFile(file: Blob, callback: Function) {
  const reader = new FileReader()
  reader.onloadend = () => {
    callback(reader.result)
  }
  reader.readAsDataURL(file)
}

const UploaderAvatar = styled(RUploader)`
  border: 4px solid ${Colors.Gray[50]};
  box-shadow: ${DropShadow.standard};
  border-radius: 50%;
  .rs-uploader-trigger {
    .rs-uploader-trigger-btn {
      background-color: ${Colors.Gray[100]};
      border: none;
      margin-top: 0;
      border-radius: 50%;
      .rs-icon {
        height: 3.438rem;
        font-size: 3.438rem;
      }
    }
  }
`
const UploadText = styled.h6`
  color: ${Colors.Black[0]};
  font-weight: ${Fonts.Weight.Medium};
  font-size: ${rfs(Fonts.Size.XSmall)};
  letter-spacing: 0.39px;
  line-height: ${convertLineHeightToCss(18, convertPxToAbs(Fonts.Size.XSmall))};
  margin-bottom: ${boxModel('5px')};
`
const UploadDisc = styled.p`
  color: ${Colors.Gray[500]};
  font-size: ${rfs(Fonts.Size.XXSmall)};
  letter-spacing: 0.22px;
  line-height: ${convertLineHeightToCss(
    18,
    convertPxToAbs(Fonts.Size.XXSmall)
  )};
`

const styles = {
  width: 60,
  height: 60,
  borderRasiud: '50%'
}
const CloseIconWrapper = styled.div`
  box-shadow: ${DropShadow.standard};
  background: ${Colors.Gray[50]};
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 3px;
  cursor: pointer;
  svg {
    width: 0.625rem;
    path {
      fill: ${Colors.Gray[200]};
    }
  }
`

interface Props {
  setFile: (data: File) => void
  imageFile?: File
}

const Avatar = ({ setFile, imageFile }: Props) => {
  const [uploading, setUploading] = React.useState(false)
  const [fileInfo, setFileInfo] = React.useState(null)
  const [error, setError] = React.useState(false)

  const removePhoto = () => {
    setError(false)
    setFile(null)
    setFileInfo(null)
  }
  return (
    <div>
      <div css={FlexStart} className="mb-20">
        <div style={{ position: 'relative' }}>
          <UploaderAvatar
            fileListVisible={false}
            listType="picture"
            autoUpload={false}
            onChange={fileList => {
              if (fileList[fileList.length - 1].blobFile.size > 1000000) {
                setError(true)
              } else {
                setError(false)
                setUploading(true)
                previewFile(
                  fileList[fileList.length - 1].blobFile,
                  (value: object) => {
                    setFile(fileList[fileList.length - 1].blobFile)
                    setFileInfo(value)
                    setUploading(false)
                  }
                )
              }
            }}
            onUpload={() => {
              setUploading(true)
            }}
            onSuccess={() => {
              setUploading(false)
            }}
            onError={() => {
              setFileInfo(null)
              setUploading(false)
            }}
          >
            <button style={styles} type="button">
              {uploading && <Loader backdrop center />}
              {fileInfo ? (
                <img src={fileInfo} width="100%" height="100%" alt="" />
              ) : (
                <AvatarIcon
                  title="avatar-icon"
                  width="1.875rem"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
            </button>
          </UploaderAvatar>
          {imageFile && (
            <CloseIconWrapper>
              <CloseIcon
                title="close-icon"
                style={{ verticalAlign: 'middle' }}
                onClick={() => removePhoto()}
              />
            </CloseIconWrapper>
          )}
        </div>

        <div className="ml-10 pr-40">
          <UploadText>Upload your photo</UploadText>
          <UploadDisc>
            Photos help your connections and teammates recognize you.
          </UploadDisc>
        </div>
      </div>
      <div className="errormsg">
        {error && (
          <ErrorMsg key={'Max photo size to upload is 1MB'}>
            {'Max photo size to upload is 1MB'}
          </ErrorMsg>
        )}
      </div>
    </div>
  )
}

export default Avatar
