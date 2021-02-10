import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface Props {
  customClass?: string
}

const CardComponent = styled.div`
  margin: 1.438rem 0;
  @media only screen and (max-width: 1919px) and (min-width: 1440px) {
    &.cardtabs {
      width: 16.25rem;
      max-width: 16.25rem;
      flex: 0 0 16.25rem;
    }
  }
  @media only screen and (max-width: 1439px) {
    &.cardtabs {
      width: 22%;
      flex: 0 0 22%;
      max-width: 22%;
    }
  }
  @media only screen and (max-width: 1140px) {
    &.cardtabs {
      width: 25%;
      flex: 0 0 25%;
      max-width: 25%;
      padding: 0;
    }
  }
  @media only screen and (max-width: 767px) {
    &.cardtabs {
      width: 100%;
      flex: 0 0 100%;
      max-width: 100%;
      padding: 0;
    }
  }
`
const Card: FunctionComponent<Props> = props => {
  const { customClass } = props
  return <CardComponent className={customClass}>{props.children}</CardComponent>
}
export default Card
