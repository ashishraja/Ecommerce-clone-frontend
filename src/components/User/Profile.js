import React, { Fragment, useEffect, useState } from "react";
import { Button , Container, VStack, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Input, ModalFooter, useDisclosure, ModalHeader } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loading/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { loadUser, updateProfilePicture } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { CLEAR_MESSAGE } from "../../constants/userConstants";

export const fileUploadCss = {
  cursor: "pointer",
  border: "none",
  borderRadius:"30px",
  padding:"1vw",
  color: 'grey',
  marginLeft: '-5%',
  width: '110%',
  height: '100%',
}

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const {  isUpdated } = useSelector((state) => state.profile);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const alert = useAlert();
  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    
    if (!image) {
      alert.error('No file selected');
      return;
    }

    const myForm = new FormData();
    myForm.append("file", image);
    await dispatch(updateProfilePicture(myForm));
    await dispatch(loadUser());
    await navigate("/account");
    onClose();
  }

  useEffect(() => {
    if (isAuthenticated === false) {
      dispatch(loadUser());
      navigate("/login");
    }

    if(isUpdated){
      alert.success(isUpdated.message);
      dispatch({type:CLEAR_MESSAGE});
    }


  }, [navigate, alert , dispatch, isUpdated , isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user && user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user && user.avatar && user.avatar.url} alt="user-avatar" />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div className="profileDetails">
              <div>
                <h4>Full Name</h4>
                <p>{user && user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user && user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user && user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                  <Button onClick={onOpen} colorScheme={'yellow'} variant={'ghost'} >
                    Change Photo
                  </Button>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>

          <ChangePhotoBox changeImageSubmitHandler={changeImageSubmitHandler} isOpen={isOpen} onClose={onClose} loading={loading} />


        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler, loading }) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(100px)'} />
      <ModalContent className="modelContent">
        <div>
          <ModalHeader className="modelHeading"><span>Change</span> <span>Photo</span></ModalHeader>
          <ModalCloseButton  className="closeButton" />
        </div>
        <ModalBody className="modalBody">
          <Container className="container">
            <form className="modalForm" onSubmit={(e) => changeImageSubmitHandler(e, image)} spacing={'8'}>
              <VStack>
                {imagePrev && <img src={imagePrev} alt="user-avatar"/>}
                <Input
                  required
                  type={'file'}
                  onChange={changeImage}
                  w={['60vw', '20vw']}
                  className="modalInput"
                />
                <Button
                  className="changeButton"
                  isLoading={loading}
                  w={['60vw', '20vw']}
                  colorScheme={'yellow'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter className="modalFooter">
          <Button onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
