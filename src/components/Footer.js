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
  background-color: var(--footer-color);
  color: #bbb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 90%;
  padding: 0.5rem;
  border-top-left-radius: calc(var(--border-radius) / 2);
  border-top-right-radius: calc(var(--border-radius) / 2);
  transition: all 200ms ease;

  & a {
    color: orange;
    margin: 0 0.325rem;
    text-decoration: none;
  }

  & > .game-button-area {
    display: flex;
    justify-content: center;
    gap: 2%;
    flex-grow: 1;
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
    <StyledFooter style={{
      height: props.phase === 'title' ? 'var(--footer-height)' : 'var(--expanded-footer-height)',
      justifyContent: props.phase !== 'game-board-showing' ? 'center' : 'flex-end',
    }}>
      {props.phase === 'title' ?
        <>made for <a href="http://epicodus.com">Epicodus</a> by <a href="http://mikedonovan.dev">mike@mikedonovan.dev</a></>
        :
        props.phase === 'game-mode-select' ?
          <>
            <FooterBackButton onClick={props.onClickBackToTitle} className='Button footer-back-button' label='<' />
            <Button className='main-footer' onClick={props.onClickAcceptGameMode} color='green' label='OK' />
          </>
          : props.phase === 'game-board-showing' ?
            <>
              <div className='game-button-area'>
                <FooterGameButton color='green' label='End Turn' />
                <FooterGameButton color='orange' label='Stand' />
              </div>
              <Hamburger />
            </>
            : props.phase === 'options' ?
              <>
                <Button onClick={props.onClickBackToTitle} label='Back' />
              </>
              :
              <>
                blargh
              </>
      }
    </StyledFooter>
  );
}

Footer.propTypes = {
  onClickBackToTitle: PropTypes.func,
  onClickBackToGameSelect: PropTypes.func,
  onClickAcceptGameMode: PropTypes.func,
};

export default Footer;
