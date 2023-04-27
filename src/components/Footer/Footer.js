import './Footer.css';
import Button from '../Button/Button';

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
          <Button color='green' label='OK' />
        </>
        :
        <>blargh</>
      }
    </footer>
  );
}

export default Footer;
