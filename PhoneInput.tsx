import React, { useState, useEffect } from 'react'
import rfs, { ErrorMsg, boxModel } from '../../utils/style'
import FormFieldHeader from './FormFieldHeader'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import variables from '../../assets/styles/variables'
import PhoneInput2 from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'

const { Colors, DropShadow, Fonts } = variables

const PhoneNumberContainer = styled('div')<{
  disabled?: boolean
  invalid?: boolean
}>`
  ${({ disabled }) => (disabled ? DisabledStyle : null)}
  ${({ invalid }) => (invalid ? InvalidStyle : null)}
  .react-tel-input {
    input {
      background: ${Colors.Gray[50]};
      border: 1px solid transparent;
      border-radius: 4px;
      font-size: ${rfs('12px')};
      height: ${boxModel('50px')};
      min-height: 32px;
      padding: ${boxModel('18px 20px 18px 70px')};
      transition: all 0.5s ease-in-out;
      width: 100%;
      color: ${Colors.Gray[500]};
      z-index: 2;
      &::placeholder {
        color: ${Colors.Gray[400]};
        &:first-letter {
          text-transform: capitalize;
        }
      }

      &:hover {
        background: ${Colors.Gray[100]};
        border-color: transparent;
      }
      &:focus,
      &:active {
        border: 1px solid ${Colors.Blue[200]} !important;
        background: ${Colors.Gray[25]};
      }
    }
    .flag-dropdown {
      background-color: transparent;
      border: none;
      width: 100%;
      z-index: auto;
      &:hover,
      &:focus {
        .selected-flag {
          background-color: transparent;
        }
      }
      &.open .selected-flag {
        background-color: transparent;
      }
    }
    .selected-flag {
      position: relative;
      width: 3.625rem;
      height: 100%;
      padding: 0.813rem 0.875rem;
      border-radius: 0;
      z-index: 3;
      .flag {
        // margin-top: -12.5px;
        // width: 25px;
        // height: 25px;
        // border-radius: 50%;
        .arrow {
          left: ${boxModel('26px')};
          top: -6px;
          border: solid ${Colors.Gray[400]};
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 0.188rem;
          transform: rotate(45deg);
        }
      }
    }
    .country-list {
      width: 100%;
      box-shadow: ${DropShadow.standard};
      margin: 0;
      padding: ${boxModel('10px 0')};
      .country {
        padding: ${boxModel('15px 20px')};
        color: ${Colors.Gray[400]};
        font-size: ${rfs(Fonts.Size.XSmall)};
        letter-spacing: 0.22px;
        cursor: pointer;
        &.highlight {
          background: ${Colors.Blue[25]};
          color: ${Colors.Blue[200]};
          .dial-code {
            color: ${Colors.Blue[200]};
          }
        }
        .dial-code {
          color: ${Colors.Gray[400]};
          font-size: ${rfs(Fonts.Size.XSmall)};
        }
      }
    }
  }
`
const DisabledStyle = css`
  .control-label {
    color: ${Colors.Gray[200]};
  }
  .react-tel-input {
    input {
      background-color: ${Colors.Gray[100]};
      cursor: not-allowed;
      &::placeholder {
        color: ${Colors.Gray[200]};
        padding-left: 0 !important;
      }
      &:hover,
      &:focus {
        background-color: ${Colors.Gray[100]} !important;
        border: none;
      }
    }
    .selected-flag .flag .arrow {
      border-color: ${Colors.Gray[200]};
    }
  }
  .help-block {
    color: ${Colors.Gray[200]};
  }
`
const InvalidStyle = css`
  .react-tel-input {
    input.form-control {
      background-color: ${Colors.Gray[25]};
      border: 1px solid ${Colors.Red[2]};
      &:hover {
        background-color: ${Colors.Gray[25]} !important;
        border: 1px solid ${Colors.Red[2]} !important;
      }
    }
  }
`

const PhoneNumberInput = styled(PhoneInput2)`
  position: relative;
  background: red;
  .PhoneInputCountry {
    position: absolute;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    .PhoneInputCountryIcon {
      width: ${boxModel('25px')};
      height: ${boxModel('26px')};
      border-radius: 50%;
      box-shadow: none;
      border: none;
      padding: 0 0;
      margin: 0;
      .PhoneInputCountryIconImg {
        width: ${boxModel('25px')};
        height: ${boxModel('25px')};
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .PhoneInputCountrySelectArrow {
      font-size: ${rfs('29px')};
      color: ${Colors.Gray[400]};
      opacity: 1;
      border-bottom-width: 2px;
      border-right-width: 2px;
      border-bottom-style: solid;
      border-right-style: solid;
    }
  }
  .PhoneInputCountrySelect:focus
    + .PhoneInputCountryIcon
    + .PhoneInputCountrySelectArrow {
    color: ${Colors.Gray[400]};
  }

  input {
    background: ${Colors.Gray[50]};
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: ${rfs('12px')};
    height: ${boxModel('50px')};
    min-height: 32px;
    padding: ${boxModel('18px 20px 18px 70px')};
    transition: all 0.5s ease-in-out;
    width: 100%;
    color: ${Colors.Gray[500]};

    &::placeholder {
      color: ${Colors.Gray[400]};
      &:first-letter {
        text-transform: capitalize;
      }
    }

    &:hover {
      background: ${Colors.Gray[100]};
      border-color: transparent;
    }
    &:focus,
    &:active {
      border: 1px solid ${Colors.Blue[200]} !important;
      background: ${Colors.Gray[25]};
    }
  }
`

interface Props {
  placeholder: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  errormsg?: string
  name: string
  label: string
  text?: string
  setPhoneNumber: (data: string) => void
  phoneValue?: string
  setPhoneError?: (data: boolean) => void
  showErrorWrapper?: boolean
  onChange?: () => void
  testId?: string
  errorMessageName?: string
  triggerRequiredValidation?: boolean
  hideValidationError?: boolean
}

const PhoneInput: React.FC<Props> = ({
  placeholder,
  name,
  label,
  disabled,
  invalid,
  required,
  text,
  setPhoneNumber,
  phoneValue,
  setPhoneError,
  showErrorWrapper,
  onChange,
  testId,
  errorMessageName,
  triggerRequiredValidation,
  hideValidationError
}) => {
  const [validationError, setValidationError] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const inputRef = React.useRef(null)

  useEffect(() => {
    if (inputRef?.current?.getCountryData()?.dialCode) {
      setCountryCode(inputRef.current.getCountryData().dialCode)
    }
  }, [])

  const handleOnChange = (value: string, data: { dialCode: string }) => {
    const phoneValueWithoutCode = value
      .replace(/[^0-9]+/g, '')
      .slice(data.dialCode.length)
    if (isValidPhoneNumber(value)) {
      setPhoneError(false)
      setValidationError('')
    } else {
      if (!phoneValueWithoutCode) {
        setValidationError(
          `Please enter your ${errorMessageName || 'phone number'}`
        )
      } else {
        setValidationError(
          `Please enter a valid ${errorMessageName || 'phone number'}`
        )
      }
      setPhoneError(true)
    }
    if (
      (countryCode !== '' && countryCode !== data.dialCode) ||
      (countryCode === '' && value === phoneValue)
    ) {
      setPhoneNumber(data.dialCode)
      setValidationError(
        `Please enter your ${errorMessageName || 'phone number'}`
      )
    } else {
      setPhoneNumber(value)
    }
    // setPhoneNumber(value)

    setCountryCode(data.dialCode)
    if (onChange) {
      onChange()
    }
  }

  useEffect(() => {
    if (triggerRequiredValidation && !phoneValue) {
      setValidationError(
        `Please enter a valid ${errorMessageName || 'phone number'}`
      )
      setPhoneError(true)
    }
  }, [phoneValue, errorMessageName, triggerRequiredValidation, setPhoneError])

  return (
    <PhoneNumberContainer
      data-testid={testId}
      invalid={invalid}
      disabled={disabled}
    >
      <FormFieldHeader
        required={required}
        label={label}
        name={name}
        text={text}
      />
      <div data-testid={'phone'}>
        <PhoneNumberInput
          country={'us'}
          value={phoneValue}
          placeholder={placeholder}
          onChange={handleOnChange}
          name={name}
          countryCodeEditable={false}
          className="phone-number-input"
          autoComplete="off"
          ref={inputRef}
        />
      </div>

      <div className={showErrorWrapper ? 'error-wrapper' : ''}>
        {!hideValidationError && validationError && (
          <ErrorMsg>{validationError}</ErrorMsg>
        )}
      </div>
    </PhoneNumberContainer>
  )
}
PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
