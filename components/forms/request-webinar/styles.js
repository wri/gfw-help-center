import styled from '@emotion/styled'
import { H4, P } from 'gfw-components';

export const Title = styled(H4)`
  margin-bottom: 20px;
`

export const Description = styled(P)`
  font-size: 20px;
  line-height: 36px;
  margin-bottom: 50px;
`

export const AgreeBoxWrapper = styled.div`
  margin-top: -10px;
  .label {
    label {
      display: none;
    }
  }
`;