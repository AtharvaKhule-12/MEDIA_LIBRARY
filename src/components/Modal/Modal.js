import React from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css';
import FileUpload from "../FileUpload";
import Card from "../Card/Card"

const Modal = (props) => {

    const Backdrop = (props) => {
        return <div className={classes.backdrop} onClick={props.onClick} />;
    };

    const ModalOverlay = (props) => {
        return <Card className={classes.modal}>
            <FileUpload addData={props.addData}/>
        </Card>
    }

    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onConfirm} />, document.getElementById("backdrop-root"))}

            {ReactDOM.createPortal(<ModalOverlay addData={props.addData}/>, document.getElementById("overlay-root"))}
        </React.Fragment>
    );
};

export default Modal;