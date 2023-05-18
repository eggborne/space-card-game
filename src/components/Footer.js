import Button from './Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FooterGameButton from './Buttons/FooterGameButton';
import Hamburger from './Hamburger';

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: var(--main-width);
  align-self: stretch;
  color: #bbb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 90%;
  padding: 0 calc(0.75rem + (var(--border-radius) / 6));
  transition: all 200ms ease;
  z-index: 2;

  & a {
    color: orange;
    margin: 0 0.325rem;
    text-decoration: none;
  }

  & > .game-button-area {
    display: flex;
    gap: 2%;
    flex-grow: 1;
  }

  & button {
    max-height: 80%;
  }
`;

const FooterBackButton = styled(Button)`
  position: absolute;
  left: 1rem;
  padding: 1rem 0;
  padding-left: 0;
  padding-right: 0;
  min-width: unset;
  width: 18%;
  max-width: 5rem;
  background-color: #747474;
`;

function Footer(props) {
  return (
    <StyledFooter 
      className='menu-style' 
      style={{
        height: props.phase === 'title' ? 'var(--footer-height)' : 'var(--expanded-footer-height)',
        justifyContent: props.phase !== 'game-board-showing' ? 'center' : 'flex-end',
      }}
    >
      {props.phase === 'title' ?
        <>made for <a href="http://epicodus.com">Epicodus</a> by <a href="http://mikedonovan.dev">mike@mikedonovan.dev</a></>
        :
        props.phase === 'game-mode-select' ?
          <>
            <FooterBackButton onClick={props.onClickBackToTitle} label='<' />
            <Button className='main-footer' onClick={props.onClickAcceptGameMode} color='green' label='OK' />
          </>
          : props.phase === 'game-board-showing' ?
            <>
              <div className='game-button-area' style={{ opacity: props.hamburgerOpen ? '0.4' : '1', pointerEvents: props.hamburgerOpen ? 'none' : 'all'}}>
                <FooterGameButton onClick={props.onClickEndTurn} color='green' label='End Turn' />
                <FooterGameButton onClick={props.onClickStand}  color='orange' label='Stand' />
              </div>
              <Hamburger onClickToggle={props.handleToggleHamburger} />
            </>
            : props.phase === 'options' || props.phase === 'hall-of-fame' ?
              <>
                <Button onClick={props.onClickBackToTitle} label='Back' />
              </>
              : props.phase === 'deck-selection' ?
              <>
                <FooterBackButton onClick={props.onClickBackToGameSelect} label='<' />
                <Button className='main-footer' onClick={props.onClickConfirmDeck} color='green' label='OK' />
              </>
              : props.phase === 'opponent-selection' ?
              <>
                <FooterBackButton onClick={props.onClickBackToDeckSelect} label='<' />
                <Button className='main-footer' onClick={props.onClickConfirmOpponent} color='green' label='START!' />
              </>
              :
              <>
                end of conditionals
              </>

      }
    </StyledFooter>
  );
}

Footer.propTypes = {
  onClickBackToTitle: PropTypes.func,
  onClickBackToGameSelect: PropTypes.func,
  onClickAcceptGameMode: PropTypes.func,
  onClickBackToDeckSelect: PropTypes.func,
  onClickConfirmDeck: PropTypes.func,
  onClickConfirmOpponent: PropTypes.func,
  userDeck: PropTypes.arrayOf(PropTypes.object),
  handleToggleHamburger: PropTypes.func,
  hamburgerOpen: PropTypes.bool,
  onClickEndTurn: PropTypes.func,
  onClickStand: PropTypes.func,
};

export default Footer;
