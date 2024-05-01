import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FiSearch } from 'react-icons/fi'
import { AiFillPlusCircle } from 'react-icons/ai'
import { collection, getDocs, onSnapshot} from 'firebase/firestore'
import { db } from './config/firebase'
import ContactCard from './components/ContactCard'
import AddUpdate from './components/AddUpdate'
import useDisclouse from './hooks/useDisclouse'  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound'

const App = () => {
  const [contacts,setContacts] = useState([]);
  const {isOpen, onClose, onOpen} = useDisclouse();

  const filterContacts = (e) =>{
    const value = e.target.value;

    const contactsRef = collection(db, "contacts")

    onSnapshot(contactsRef, (snapshot)=>{
      const contactLists = snapshot.docs.map((doc)=>{
        return{
          id:doc.id,
          ...doc.data()
        }
      })

        const filteredContacts = contactLists.filter(contact =>
        contact.name.toLowerCase().includes(value.toLowerCase()))

          setContacts(filteredContacts)


          return filteredContacts
    })
  }


  useEffect(()=>{

    const getContacts = async()=>{
          try{
              const contactsRef = collection(db, "contacts")

              onSnapshot(contactsRef, (snapshot)=>{
                const contactLists = snapshot.docs.map((doc)=>{
                  return{
                    id:doc.id,
                    ...doc.data()
                  }
                })
                    setContacts(contactLists)
                    return contactLists
              })

          }catch(error){
                console.log(error);
          }
    };
     getContacts()
  },[])

  return (
<>    
      <div className='max-w-[370px] mx-auto px-2'>
        <Navbar />
        <div className="flex gap-2">
          <div className='relative flex items-center flex-grow '>
            <FiSearch className='ml-1 absolute text-3xl text-white' />
            <input onChange={filterContacts} type="text" className='h-10 flex-grow  border bg-transparent border-white 
          rounded-md text-white pl-9'/>
          </div>
          <AiFillPlusCircle 
            onClick={onOpen}
            className='text-5xl cursor-pointer text-white' />
        </div>
        <div>
          {contacts.length <= 0? <NotFound/>: contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
          }
        </div>
      </div>
      <AddUpdate onClose={onClose} isOpen={isOpen}/>
      <ToastContainer position='bottom-center'/>
</>
  )
}

export default App