import copyimg from "../assets/copy.png";
import gitImg from "../assets/github.png";

const FooterNotes = (props) => {
  return (
    <footer className="footer">
      <img className="copy" src={copyimg} alt="copyright" />
      <p>Copyright {props.name}</p>
      <img className="github" src={gitImg} alt="github" />
    </footer>
  );
};

export default FooterNotes;
