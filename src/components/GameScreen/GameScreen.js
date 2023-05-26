import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VersusScreen from './VersusScreen';
import PlayerArea from './PlayerArea';
import PlayerPortrait from '../PlayerPortrait';
import HamburgerMenu from '../HamburgerMenu';
import Modal from '../Modal';
import { pause } from '../../util.js';

const StyledGameScreen = styled.div`
  height: var(--game-board-height);
  padding: 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  overflow: hidden;
`;

const GameBoard = styled.div`
  position: absolute;
  height: calc(var(--actual-height) - var(--expanded-footer-height));
  min-width: var(--main-width);
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  font-weight: bold;
  transition: transform 1350ms ease, opacity 1000ms ease;
`;

function GameScreen(props) {
  const [versusScreenShowing, setVersusScreenShowing] = useState(true);
  const [gameBoardShowing, setGameBoardShowing] = useState(false);
  const [endGameModalShowing, setEndGameModalShowing] = useState(false);

  useEffect(() => {
    animate();
  });

  async function animate() {
    document.getElementById('player-area-1').classList.add('onscreen');
    document.getElementById('player-area-2').classList.add('onscreen');
    await pause(1750);
    document.getElementById('versus-screen').classList.add('zoomed-off');
    await pause(600);
    setGameBoardShowing(true);
    await pause(400);
    setVersusScreenShowing(false);
  }

  function handleConfirmEndGame() {
    props.onClickEndGame();
  }

  const debug = true;

  return (
    <>
      {debug && 
        <div style={{ position: 'fixed', zIndex: '3', backgroundColor: '#000000aa', top: '0', left: '0', padding: '0.5rem 1.5rem' }}>
          {props.currentGame.currentTurn}'s turn: {props.currentGame.turnPhase}
        </div>
      }
      <HamburgerMenu
        open={props.hamburgerOpen}
        user={props.user}
        handleUpdatingAppliedTheme={props.handleUpdatingAppliedTheme}
        onClickEndGame={() => setEndGameModalShowing(true)}
      />

      <StyledGameScreen
        style={{ display: props.showing ? 'flex' : 'none' }}
      >
        <VersusScreen user={props.user} opponent={props.opponent} showing={versusScreenShowing} />
        <GameBoard
          style={{
            transform: gameBoardShowing ? 'scale(1)' : 'scale(0.5)',
            opacity: gameBoardShowing ? '1' : '0',
          }}
        >
          {['opponent', 'user'].map((player, p) => 
            <div key={p}>
              <PlayerArea
                selectedCard={props.currentGame.selectedCard}
                handleClickSelectCard={props.handleSelectingCard}
                playerObject={props[player]}
                playerStatus={props.currentGame[player + 'Status']}
                isTurn={props.currentGame.currentTurn === player}
                turnPhase={props.currentGame.turnPhase}
                playCard={props.playCard}
                portrait={
                  <PlayerPortrait
                    size='calc(var(--section-height) / 1.5)'
                    displayName={props[player].displayName}
                    imagePath={props[player].imagePath}
                    sheetCoords={props[player].sheetCoords}
                  />
                }
              />
            </div>
          )}
        </GameBoard>
        <Modal
          showing={props.currentGame.turnPhase === 'showing-results'}
          headline={'SET WINNER'}
          color='maroon'
          buttonLabel='OK'
          bodyComponent={<>
            {
              (props.currentGame.userStatus.matchScore <= 20 && props.currentGame.userStatus.matchScore > props.currentGame.opponentStatus.matchScore) || props.currentGame.opponentStatus.matchScore > 20 ? props.user.displayName : 
              (props.currentGame.opponentStatus.matchScore <= 20 && props.currentGame.opponentStatus.matchScore > props.currentGame.userStatus.matchScore) || props.currentGame.userStatus.matchScore > 20 ?
              props.opponent.displayName : null
            }
          </>}
          onClickOK={() => null}
        />
      </StyledGameScreen>
      <Modal
        showing={endGameModalShowing}
        headline={'End game?'}
        color='maroon'
        buttonLabel='Do it'
        bodyComponent={<></>}
        onClickOK={handleConfirmEndGame}
        onClickCancel={() => setEndGameModalShowing(false)}
      />
    </>
  );
}

GameScreen.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  currentGame: PropTypes.object,
  showing: PropTypes.bool,
  hamburgerOpen: PropTypes.bool,
  gameMode: PropTypes.string,
  handleSelectingCard: PropTypes.func,
  handleUpdatingAppliedTheme: PropTypes.func,
  onClickEndGame: PropTypes.func,
  playCard: PropTypes.func,
};

export default GameScreen;