import copyimg from "../assets/copy.png";
import gitImg from "../assets/github.png";

const FooterNotes = () => {
  return (
    <footer className="footer">
      <img className="copy" src={copyimg} alt="copyright" />
      <p>Copyright Sonia Felizardo Gomez</p>
      <img className="github" src={gitImg} alt="github" />
    </footer>
  );
};

export default FooterNotes;
