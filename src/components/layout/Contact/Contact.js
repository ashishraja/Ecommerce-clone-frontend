import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./Contact.css"
import { FormLabel , Textarea } from '@chakra-ui/react';
import { Box, Button, Heading, Input } from '@chakra-ui/react'
import Aos from "aos";
import "aos/dist/aos.css"

const Contact = () => {

    useEffect(()=>{
        Aos.init({duration:2000})
    },[])

  return (
   <section data-aos="fade-up" className="contact-section">
     <div className="container">
            <div data-aos="fade-down" className="content">
                <Heading className='heading'>Contact Us</Heading><br />
                <form  action="https://formsubmit.co/3d5a3a2b25cc283f9065564c11177985" method="POST">    
                    <FormLabel className="label" htmlFor='name'>Enter your Full Name</FormLabel>  
                    <Input
                     required
                     id="name"
                     name="name"
                     className={"contact-input"}
                     placeholder="Full Name"
                     type={"text"}
                    />
                    <FormLabel className="label" htmlFor='name'>Enter your Email Address</FormLabel> 
                    <Input
                     required
                     id="email"
                     className={"contact-input"}
                     name="email"
                     placeholder="ash@gmail.com"
                     type={"email"}
                    />
                    <FormLabel className="label" htmlFor='name'>Enter your Message</FormLabel> 
                    <Textarea 
                     required
                     className="contact-input"
                     id="message"
                     name="message"
                     placeholder="Enter your Message"
                     rows={"5"}
                     type={"text"}
                    />
                    <br />
                    <br />
                    <Button className='contact-btn' type="submit">
                        <span>Send Mail</span>
                    </Button>

                </form>
            </div>
     </div>
   </section>
  )
}

export default Contact

