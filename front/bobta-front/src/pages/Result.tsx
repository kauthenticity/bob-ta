import React, {useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'
import {Link, useLocation, useParams} from 'react-router-dom'

import * as colors from '../styles/colors'
import {LogoLinked, KakaoShareButton, TimeTable, Footer, Button} from '../components'
import {RootContainer} from '../styles'

type TitleProps = {
  isBest: boolean
}

type RankingButtonProps = {
  isSelected: boolean
}

export const Result = () => {
  const location = useLocation()
  const {groupId} = useParams()

  const [isBest, setIsBest] = useState<boolean>(false)
  const [selectedNumber, setSelectedNumber] = useState<number>(1)

  const onClickRankingButton = useCallback((rankingNumber: number) => {
    setSelectedNumber(rankingNumber)
  }, [])

  return (
    <RootContainer>
      <LogoLinked />
      <Container>
        <TitleWrapper>
          <Title isBest={isBest}>진실님의 밥약</Title>
          <GuideText>
            모두가 가능한 시간이 없습니다.
            <br />
            가능한 시간이 많은 순으로 결과를 보여줍니다.
          </GuideText>
        </TitleWrapper>
        <RankingButtonContainer>
          {[...Array(5)].map((item, idx) => (
            <RankingButton key={idx} isSelected={selectedNumber == idx + 1} onClick={() => onClickRankingButton(idx + 1)}>
              {idx + 1}순위
            </RankingButton>
          ))}
        </RankingButtonContainer>
        <TimeTable />
        <ButtonContainer>
          <KakaoShareButton label="친구에게 추가 요청" groupId={groupId} />
          <AddSelfButtonLink to="/create?target=me">
            <Button label="시간표 추가하기" />
          </AddSelfButtonLink>
        </ButtonContainer>
      </Container>
      <Footer />
    </RootContainer>
  )
}

const RankingButton = styled.button<RankingButtonProps>`
  background-color: ${props => (props.isSelected ? props.theme.rankingButton.enabled.bgColor : props.theme.rankingButton.disabled.bgColor)};

  color: ${props => (props.isSelected ? props.theme.rankingButton.enabled.fontColor : props.theme.rankingButton.disabled.fontColor)};

  border-radius: 20px;
  padding: 4px 14px;
  margin-right: 8px;
  border: none;
  font-family: 'Pretendard-Medium';
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  flex: 0 0 auto;
`

const RankingButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 16px;
  overflow-x: auto;
`

const TitleWrapper = styled.div`
  margin-bottom: 24px;
  color: ${({theme}) => theme.colors.gray800};
`

const GuideText = styled.p`
  font-family: 'Pretendard-Regular', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: ${({theme}) => theme.colors.gray700};
  margin-block-start: 0;
  margin-block-end: 0;
`

const AddSelfButtonLink = styled(Link)`
  text-decoration: none;
`

const Title = styled.h2<TitleProps>`
  margin-block-start: 0;
  margin-block-end: 0;
  font-family: 'Pretendard-Bold', sans-serif;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: ${props => (props.isBest ? '24px' : '8px')};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  height: 110px;
  justify-content: space-between;
`
