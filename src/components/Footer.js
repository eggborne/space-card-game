import Button from './Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hamburger from './Hamburger';

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: var(--main-width);
  padding: 1rem 0;
  align-self: stretch;
  background-color: var(--footer-color);
  color: #bbb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 90%;
  padding: 0 1rem;
  transition: all 200ms ease;

  & a {
    color: orange;
    margin: 0 0.325rem;
    text-decoration: none;
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
  const footerStyle = {
    height: props.phase === 'title' ? 'var(--footer-height)' : 'var(--expanded-footer-height)',
  }
  return (
    <StyledFooter style={footerStyle}>
      {props.phase === 'title' ?
        <>made for <a href="http://epicodus.com">Epicodus</a> by <a href="http://mikedonovan.dev">mike@mikedonovan.dev</a></>
        :
        props.phase === 'game-mode-select' ?
        <>
          <FooterBackButton onClick={props.onClickBackToTitle} className='Button footer-back-button' label='<'/>
          <Button className='main-footer' onClick={props.onClickAcceptGameMode} color='green' label='OK' />
        </>
        : props.phase === 'game-board-showing' ?
          <>
            {/* <FooterBackButton onClick={props.onClickBackToGameSelect} className='Button footer-back-button' label='<'/> */}
            <Hamburger />
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
