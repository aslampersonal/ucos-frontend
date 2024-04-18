import React, { useState } from 'react';
import "./Toast.css"
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiFillWarning, AiOutlineClose } from 'react-icons/ai';

export default function Toast({ show, type, message }) {

    if (type === "success") {
        return (
                <div 
                    className={`toast ${show ? 'show' : ''}`} 
                    role="alert" 
                    aria-live="assertive" 
                    aria-atomic="true"
                >
                    <div className="toast-body">
                        <AiFillCheckCircle className='toast-icons text-success' />
                        <strong className="me-auto mx-2">{message}</strong>
                        <AiOutlineClose
                            type="button"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        />
                    </div>
                </div>
          );   
    } else if (type === "error") {
        return (
                <div 
                    className={`toast ${show ? 'show' : ''}`} 
                    role="alert" 
                    aria-live="assertive" 
                    aria-atomic="true"
                >
                    <div className="toast-body">
                        <AiFillCloseCircle className='toast-icons text-danger' />
                        <strong className="me-auto mx-2">{message}</strong>
                        <AiOutlineClose
                            type="button"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        />
                    </div>
                </div>
          );
    } else if (type === "warning") {
        return (
                <div 
                    className={`toast ${show ? 'show' : ''}`} 
                    role="alert" 
                    aria-live="assertive" 
                    aria-atomic="true"
                >
                    <div className="toast-body">
                        <AiFillWarning className='toast-icons text-warning' />
                        <strong className="me-auto mx-2">{message}</strong>
                        <AiOutlineClose
                            type="button"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        />
                    </div>
                </div>
          );
    } else if (type === "info") {
        return (
                <div 
                    className={`toast ${show ? 'show' : ''}`} 
                    role="alert" 
                    aria-live="assertive" 
                    aria-atomic="true"
                >
                    <div className="toast-body">
                        <AiFillInfoCircle className='toast-icons text-info' />
                        <strong className="me-auto mx-2">{message}</strong>
                        <AiOutlineClose
                            type="button"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        />
                    </div>
                </div>
          );
    }
};

