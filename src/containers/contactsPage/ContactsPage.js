import React, { useState, useEffect} from "react";
import { ContactForm } from '../../components/contactForm/ContactForm'
import { TileList } from '../../components/tileList/TileList'

export const ContactsPage = ({ contacts, addContact}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!duplicate) {
      // checks for duplicate, then add the 3 state values in
      addContact(name,phone,email)

      // Clears form and return to default state
      setName('')
      setPhone('')
      setEmail('')
    }
  };

  // calling useEffect to check for duplicates and setDuplicate to true/false
  useEffect(() => {
    const nameIsDuplicate = () => {
      const found = contacts.find((contact) => contact.name === name)
      if(found !== undefined) {
        return true
      }
      return false
    }

    if(nameIsDuplicate()) {
      setDuplicate(true)
    } else {
      setDuplicate(false)
    }

  }, [name, contacts, duplicate]) //added dependency array

  return (
    <div>
      <section>
        <h2>Add Contact</h2>
        <p>{duplicate? 'Name already exists' : ''}</p> 
        <ContactForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
        />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList tiles={contacts} />
      </section>
    </div>
  );
};
