/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, {
  FunctionComponent,
  Fragment,
  useCallback,
  useEffect,
  useRef
} from 'react'
import { Uploader } from 'rsuite'
import styled from '@emotion/styled'
import 'rsuite/dist/styles/rsuite-default.css'
import { css } from '@emotion/core'
import { ErrorMsg, FlexBetween } from '../../utils/style'
import moment from 'moment'
import variables from '../../assets/styles/variables'
import { FileType } from 'rsuite/lib/Uploader'
import Button from './Button'
import FormFieldHeader from './FormFieldHeader'

const { Fonts, Colors } = variables

const UPLOAD_GRAY_AVATAR = require('../../assets/images/onboarding/upload_gray.svg')

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
  fileSizeInMB?: number
  infoText?: string
  handelOnRemovePhoto?: () => void
  showDeleteCurrentPhoto?: boolean
  customFilename?: string
  setUrl: (data: string | ArrayBuffer) => void
  handleCancle?: () => void
  handelSetPhoto?: () => void
  required?: boolean
  invalid?: boolean
  invalidMsg?: string
  label?: string
  name?: string
  accept?: string
}

const ImageUploadContainer = styled.div`
  height: 50px !important;
  border-radius: 3px;
  padding: 0 0.9rem !important;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  margin-top: 0 !important;
  border-radius: 3px !important;
`

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`

const InfoText = styled.span`
  color: #333333;
  margin-bottom: 0.3125rem;
  font-size: 0.7rem;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const BrowseButton = styled(Button)`
  border-radius: 4px;
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  padding: 0.2rem 1.7rem !important;
  border: 1px solid #b6d0fd !important;
  &:focus {
    border-radius: 4px !important;
    font-weight: 500 !important;
    font-size: 0.75rem !important;
    outline: 0 !important;
    border: 1px solid #b6d0fd !important;
    padding: 0.2rem 1.7rem !important;
  }
`

const ImageUploadContent = styled('div')<{ invalid?: boolean }>`
  ${({ invalid }) => (invalid ? InvalidStyle : null)}
  width: 100%;
  .rs-uploader-picture {
    width: 100%;
    .rs-uploader-trigger {
      width: 100%;
      .rs-uploader-trigger-btn {
        width: 100%;
      }
    }
  }
`

const InvalidStyle = css`
  .base-upload {
    .rs-uploader-trigger-btn {
      background-color: ${Colors.Gray[25]};
      border: 1px solid ${Colors.Red[2]};
      &:hover {
        background-color: ${Colors.Gray[25]};
        border: 1px solid ${Colors.Red[2]};
      }
    }
  }
`

const FileTypeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Colors.Blue[200]};
  width: 20px;
  height: 25px;
  border-radius: 3px;
`

const FileInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 12px;
  .fileName {
    color: ${Colors.Gray[500]};
    font-size: 0.7rem;
    font-weight: ${Fonts.Weight.Medium};
  }
  .fileInfo {
    color: ${Colors.Gray[400]};
    font-size: 0.575rem;
  }
`

function bytesToSize(size: number) {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) +
    ' ' +
    ['B', 'KB', 'MB', 'GB', 'TB'][i]
  )
}

const getFileInfo = (file: File) => {
  let infoStr =
    moment(file.lastModified).format('Do MMMM, YYYY') +
    ' at ' +
    moment(file.lastModified).format('LT') +
    ' | ' +
    bytesToSize(file.size)
  return infoStr
}

const FileDraggableUpload: FunctionComponent<Props> = props => {
  const {
    setFile,
    imageFile,
    onUpload,
    fileSizeInMB = 1,
    infoText,
    customFilename,
    setUrl,
    invalid,
    invalidMsg,
    required,
    label,
    name
  } = props

  const [error, setError] = React.useState(false)
  const [wrongImageFormateError, setWrongImageFormateError] = React.useState(
    false
  )
  const [fileName, setFileName] = React.useState('')
  const inputEl = useRef(null)

  const handelUploaderOnChange = useCallback(
    async (fileList: FileType[]) => {
      setError(false)
      setWrongImageFormateError(false)
      const allowedExtensions = /(\.pdf)$/i
      if (
        fileList[fileList.length - 1].blobFile.size >=
        fileSizeInMB * 1000000
      ) {
        setError(true)
      } else if (!allowedExtensions.exec(fileList[fileList.length - 1].name)) {
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
    },
    [fileSizeInMB, onUpload, setFile, setUrl]
  )

  useEffect(() => {
    if (imageFile?.name) {
      setFileName(imageFile?.name)
    } else {
      setFileName(customFilename)
    }
  }, [customFilename, imageFile])

  return (
    <ImageUploadContent invalid={invalid}>
      <div css={FlexBetween}>
        <FormFieldHeader
          required={required}
          label={label}
          name={name}
          text={''}
        />
        <InfoText>{infoText}</InfoText>
      </div>
      <div
        style={{ position: 'relative', width: `100%` }}
        className="base-upload"
      >
        <Uploader
          circularCrop={true}
          fileListVisible={false}
          listType="picture"
          ref={inputEl}
          accept={'application/pdf'}
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
            <DescriptionContainer>
              {!imageFile ? (
                <Fragment>
                  <img
                    src={UPLOAD_GRAY_AVATAR}
                    alt="upload-gray_avatar"
                    style={{ marginRight: 10 }}
                  />
                  <span>Drop your file here or browse to upload</span>
                </Fragment>
              ) : (
                <Fragment>
                  <FileTypeContent>
                    <span style={{ color: 'white', fontSize: '0.5rem' }}>
                      PDF
                    </span>
                  </FileTypeContent>
                  <FileInfoContent>
                    <span className="fileName">{fileName}</span>
                    <span className="fileInfo">{getFileInfo(imageFile)}</span>
                  </FileInfoContent>
                </Fragment>
              )}
            </DescriptionContainer>
            <ButtonsContainer>
              <BrowseButton>Browse</BrowseButton>
            </ButtonsContainer>
          </ImageUploadContainer>
        </Uploader>
        <ImgErrorMsg>
          {invalid && invalidMsg && (
            <ErrorMsg key={'invalidError'}>{invalidMsg}</ErrorMsg>
          )}
          {error && (
            <ErrorMsg key={'uploadSizeError'}>
              {`Max file size to upload is ${fileSizeInMB}MB`}
            </ErrorMsg>
          )}
          {wrongImageFormateError && (
            <ErrorMsg key={'uploadFormateError'}>
              {`Your file should be a PDF`}
            </ErrorMsg>
          )}
        </ImgErrorMsg>
      </div>
    </ImageUploadContent>
  )
}

export default FileDraggableUpload
