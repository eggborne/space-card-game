import './Footer.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

function Footer(props) {
  const footerStyle = {
    height: props.phase === 'title' ? 'var(--footer-height)' : 'var(--expanded-footer-height)',
  }
  return (
    <footer className="Footer" style={footerStyle}>
      {props.phase === 'title' ?
        <>made for <a href="http://epicodus.com">Epicodus</a> by <a href="http://mikedonovan.dev">mike@mikedonovan.dev</a></>
        :
        props.phase === 'game-mode-select' ?
        <>
          <button onClick={props.onClickBackToTitle} className='Button footer-back-button'>{'<'}</button>
          <Button onClick={props.onClickAcceptGameMode} color='green' label='OK' />
        </>
        : props.phase === 'game-board-showing' ?
          <>
            footer for game board!
          </>
          :
          <>
            blargh
          </>
      }
    </footer>
  );
}

Footer.propTypes = {
  onClickBackToTitle: PropTypes.func,
  onClickAcceptGameMode: PropTypes.func,
};

export default Footer;
