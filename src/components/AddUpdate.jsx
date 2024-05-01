import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'
import * as Yup from "yup"


const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is required"),
    email:Yup.string().required("Email is required").email("Invalid email"),
})

const AddUpdate = ({isOpen, onClose, isUpdate, contact}) => {

    const addContact = async (contact) =>{
        try{
                // const contactRef = collection(db, "contacts");
                await addDoc(collection(db, "contacts"), contact);
                onClose();
                toast.success("Contact Added Succesfully")
        }catch(err){
            console.log(err,"addcontact error");
        }
    }

    const updateContact = async (contact,id ) =>{
        try{
                const contactRef = doc(db, "contacts",id);
                await updateDoc(contactRef, contact);
                onClose();
                toast.success("Contact Updated Succesfully")
        }catch(err){
            console.log(err,"addcontact error");
        }
    }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
        initialValues={ 
            isUpdate?{
                name:contact.name,
                email:contact.email,
        }:{
            name:"",
            email:'',
        }}
        onSubmit={(values)=>{
            console.log(values);
            isUpdate? updateContact(values, contact.id) : addContact(values)
        }}
        >
            <Form className='flex flex-col gap-3'> 
                <div className='flex flex-col gap-1'> 
                <label htmlFor='name'>Name</label>
                <Field name="name" className="h-10 border"/>
                <div className='text-red-500  text-xs'>
                <ErrorMessage name='name'/>
                </div>
                </div>
                <div className='flex flex-col gap-1'> 
                <label htmlFor='email'>Email</label>
                <Field type="email" name="email" className="h-10 border"/>
                <div className='text-red-500  text-xs'>
                <ErrorMessage name='email'/>
                </div>
                </div>
                <button type='submit' className='border bg-orange px-3 py-1.5 self-end'>{isUpdate ? "Update": "Add"} Contact</button>
            </Form>
        </Formik>
    </Modal>
  )
}

export default AddUpdate