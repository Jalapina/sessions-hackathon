import React, { SFC } from "react";
import { useTransition, config, animated } from "react-spring";

import { DialogOverlay, DialogContent } from "@reach/dialog";
import "../../assets/css/reach-modal-overrides.scss";

export const StandardModalHeader = props => {
  let { onHide, caption } = props;
  return (
    <>
      <div className="standard-reach-header">
        <div className="modal-title">{caption}</div>
        <span
          style={{ cursor: "pointer", marginLeft: "auto" }}
          className="close"
          onClick={onHide}
        >
          <span>&times;</span>
        </span>
      </div>
      <hr />
    </>
  );
};

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

const Modal: SFC<any> = props => {

    let { isOpen, onHide, headerCaption, focusRef = null, children } = props;

    const modalTransition = useTransition(!!isOpen, {
    config: isOpen ? { ...config.stiff } : { duration: 150 },
    from: { opacity: 0, transform: `translate3d(0px, -10px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(0px, 10px, 0px)` }
    });

    return modalTransition(
    (styles, isOpen) =>
        isOpen && (
        <AnimatedDialogOverlay
            allowPinchZoom={true}
            initialFocusRef={focusRef}
            onDismiss={onHide}
            isOpen={isOpen}
            style={{ opacity: styles.opacity }}
        >
            <AnimatedDialogContent
            style={{
                maxWidth: "400px",
                background: "#000000",
                ...styles
            }}
            >
            <div>
                <div>
                <StandardModalHeader caption={headerCaption} onHide={onHide} />
                {children}
                </div>
            </div>
            </AnimatedDialogContent>
        </AnimatedDialogOverlay>
        )
    );
};
        
export default Modal
