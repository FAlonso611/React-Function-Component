import React from 'react'
import Logo from '../../assets/images/done_icon.svg'
import styled from '@emotion/styled'
import rfs, {
  boxModel,
  convertLineHeightToCss,
  convertPxToAbs
} from '../../utils/style'
import variables from '../../assets/styles/variables'

const { Fonts, Colors } = variables

const SignUpData = styled.div`
  display: flex;
  align-items: flex-start;
`
const FreePlanText = styled.p`
  color: ${Colors.Gray[400]};
  letter-spacing: 0.28px;
  font-size: ${rfs(Fonts.Size.XSmall)};
  line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.XSmall))};
  margin: ${boxModel('0 0 18px 10px')};
`
const CheckIcon = styled.img`
  min-width: 20px;
`

interface Props {
  text?: string
}

const FreePlanInfo: React.FC<Props> = ({ text, ...props }) => {
  return (
    <SignUpData>
      <CheckIcon src={Logo} alt="" />
      <FreePlanText {...props}>{text}</FreePlanText>
    </SignUpData>
  )
}

export default FreePlanInfo
