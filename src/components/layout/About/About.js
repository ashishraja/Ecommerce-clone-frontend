import { Text, Heading, Stack, VStack, HStack } from '@chakra-ui/react'
import React from 'react'
import video from "../../../assets/videos/video.mp4"
import img from "../../../assets/images/1.png"
import { RiSecurePaymentFill } from 'react-icons/ri'
import termsAndConditions from "../../../assets/docs/termsAndConditions.js";
import "./About.css";



const Founder = () => (
    <div className="founder-stack">
        <div>
            <img src={img} />
            <p>Co-Founder</p>
        </div>

        <div className="founder-stack-div">
            <h1 className="founder-heading">Ashish Santani</h1>
            <p children={`Hi, Im a Full-Stack MERN Developer. I create responsive and secured websites for my clients. 
            Im a versatile and skilled professional who is proficient in both front-end and back-end web development.`}
            ></p>
        </div>
    </div>
);


const VideoPlayer = () => (
    <div className='video-div'>
        <video
            autoPlay
            muted
            loop
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={video}
        ></video>
    </div>
);

const TandC = () => (
    <div className='tc-div'>
        <h1 className='tc-heading'>
            Terms & Conditions
        </h1>

        <div>
            <p>
                {termsAndConditions}
            </p>
            <h1>
                Refund only applicable for cancellation within 7 days.
            </h1>
        </div>
    </div>
);

const About = () => {

    return (
        <div className='about-container'>
            <h1 className="about-heading" children="About Us" mb={['0', '4']} textAlign={['center', 'left']} />
            <Founder />
            <VideoPlayer />
            <TandC termsAndConditions={termsAndConditions} />
            <div className='payment-fill-div'>
                <RiSecurePaymentFill />
                <h1 className='payment-fill'>
                    Payment is secured by Razorpay
                </h1>
            </div>
        </div>
    )
}

export default About