import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import rfs, { convertLineHeightToCss, boxModel } from '../../utils/style'
import { HelpBlock as RHelpBlock, ControlLabel as RControlLabel } from 'rsuite'
import variables from '../../assets/styles/variables'
import { InputProps } from 'rsuite/lib/Input/Input'

const { Fonts } = variables

const { Colors } = variables

const InputHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${boxModel('5px')};
`
const ControlLabel = styled(RControlLabel)`
  color: ${Colors.Gray[500]};
  font-size: ${rfs('0.8rem')};
  font-weight: ${Fonts.Weight.Medium};
  letter-spacing: ${rfs('0.39px')};
  line-height: ${convertLineHeightToCss(22, 14)};
  margin-bottom: 0;
  &::first-letter {
    text-transform: capitalize;
  }
`
const HelpBlock = styled(RHelpBlock)`
  font-size: ${rfs('12px')};
  letter-spacing: ${rfs('0.22px')};
  line-height: ${convertLineHeightToCss(18, 12)};
  color: ${Colors.Gray[400]};
  min-height: auto;
`

const Required = styled.span`
  color: ${Colors.Red[2]};
`

interface Props extends InputProps {
  label: string
  name: string
  text?: string | ReactNode
  required?: boolean
}

const FormFieldHeader: React.FC<Props> = ({
  name,
  label,
  text,
  required,
  ...props
}) => {
  return (
    <InputHeader>
      <ControlLabel className="control-label" htmlFor={name} {...props}>
        {label}
        {required && <Required> *</Required>}
      </ControlLabel>
      <HelpBlock className="help-block">{text}</HelpBlock>
    </InputHeader>
  )
}

export default FormFieldHeader
