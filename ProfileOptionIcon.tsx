import React, { FunctionComponent, ReactElement } from 'react'
import styled from '@emotion/styled'

interface Props {
  icon: ReactElement
}

const ProfileOptionIconComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #b6d0fd;
    font-size: 1.25rem;
    &.icon-eye {
      font-size: 0.938rem;
    }
    &.icon-nav-notifications {
      font-size: 1.5rem;
    }
  }
`

const ProfileOptionIcon: FunctionComponent<Props> = props => {
  const { icon } = props
  return <ProfileOptionIconComponent>{icon}</ProfileOptionIconComponent>
}

export default ProfileOptionIcon
