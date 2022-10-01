import './Contact.scss';
import ContactMe from './components/contactMe/contactMe';
import CV from './components/cv/cv';

function ContactPage() {
  return (
    <div className="Contact_MainContainer">
      <div className="Contact_LeftContainer">
        <ContactMe />
      </div>
      <div className="Contact_CenterContainer">
        <CV />
      </div>
    </div>
  );
}

export default ContactPage;
