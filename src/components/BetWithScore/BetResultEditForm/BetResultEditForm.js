import React, { Component } from 'react'
import { Flex } from 'reflexbox'
import getFormData from 'get-form-data'
import styled from 'styled-components'

import { success } from '../../../utils/toast'
import { Button, TextField } from '../../Form'
import Match from '../../Match'

class BetResultEditForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resultA: this.props.bet.betNumbers.a,
      resultB: this.props.bet.betNumbers.b
    }
  }

  onResultAChange(e) {
    const value = Number(e.currentTarget.value)

    this.setState({ resultA: value })
  }

  onResultBChange(e) {
    const value = Number(e.currentTarget.value)

    this.setState({ resultB: value })
  }

  render() {
    const { bet, game, makeBet, onComplete } = this.props
    const { resultA, resultB } = this.state

    return (
      <form
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault()

          const formData = getFormData(e.currentTarget)
          let variables = {
            bet: {
              a: formData.resultA,
              b: formData.resultB
            },
            gameId: game.id,
            gamblerId: bet.gambler.id
          }

          if (formData.winInPenalties) {
            variables.bet.winInPenalties = formData.winInPenalties
          }

          makeBet({ variables })

          onComplete()

          success('WOW! Udało Ci się obstawić wynik.')
        }}
      >
        <Match
          date={game.date}
          phase={game.phase}
          group={game.teamA.group}
          teamACode={game.teamA.code}
          teamAName={game.teamA.name}
          teamBCode={game.teamB.code}
          teamBName={game.teamB.name}
          resultA={
            <TextField
              name="resultA"
              defaultValue={bet.betNumbers.a}
              onChange={e => this.onResultAChange(e)}
            />
          }
          resultB={
            <TextField
              name="resultB"
              defaultValue={bet.betNumbers.b}
              onChange={e => this.onResultBChange(e)}
            />
          }
        />

        {resultA === resultB && (
          <WinInPenaltiesContainer align="center">
            <WinInPenaltiesText>Wygrany w rzutach karnych:</WinInPenaltiesText>
            <TextField
              name="winInPenalties"
              defaultValue={bet.betNumbers.winInPenalties}
            />
          </WinInPenaltiesContainer>
        )}

        <SaveContainer justify="flex-end">
          <Button type="submit">Zapisz</Button>
        </SaveContainer>
      </form>
    )
  }
}

const SaveContainer = styled(Flex)`
  margin: 20px 0;
`

const WinInPenaltiesContainer = styled(Flex)`
  position: absolute;
  margin: 20px 0;
`

const WinInPenaltiesText = styled(Flex)`
  margin-right: 5px;
`

export default BetResultEditForm
