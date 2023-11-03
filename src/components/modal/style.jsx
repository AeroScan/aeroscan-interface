import styled from "styled-components";
import select from "../../assets/img/select.svg";
import { Modal } from "antd";

export const ModalHeader = styled.div`
    cursor: move;

    .closeIcon{
        color: #000;
        font-size: 3.2rem;
        margin-right: 30px;
        padding: 1px;
        position: absolute;
        right: 0;

        &:hover{
            background: #D0D3D4;
            border-radius: 5px;
        }
    }

    h1{ 
        font-size: 1.5rem;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
        width: 100%;
    }
`;

export const AntModal = styled(Modal)`

    .ant-modal-header{
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    }

    .ant-modal-body{
        
        div{
            margin: 0 auto 20px;
            text-align: center;
            width: 100%;

            h2{
                font-size: 1.25rem;
                text-align: justify;
                width: 100%;
            }

            p, span{
                font-size: 1.25rem;
            }

            li{
                background: #000;
            }

            form{
                width: 100%;

                div.formContainer{
                    align-items: center;
                    display: flex;
                    margin-top: 20px;
                    text-align: center;
                    width: 75%;

                    p{
                        font-size: 1.6rem;
                        text-align: center;
                        width: 100%;
                    }

                    label{
                        font-size: 1.25rem;
                        text-align: right;
                        min-width: 150px;
                    }
                    
                    input{
                        border: none;
                        border-radius: 5px;
                        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.45);
                        font-size: 1.6rem;
                        height: 3.5vh;
                        margin-left: 10px; 
                        padding: 5px;
                        width: 50%;
                    }

                    select{
                        appearance: none;
                        background: url(${select}) no-repeat 95% center #FFF;
                        background-size: 12px;
                        border: none;
                        border-radius: 5px;
                        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.45);
                        cursor: pointer;
                        font-size: 1.8rem;
                        margin-left: 10px; 
                        padding: 5px;
                        width: 50%;
                            
                        -moz-appearance: none;
                        -webkit-appearance: none;

                        option{
                            font-size: 1.8rem;
                        }
                    }

                    img{
                        height: 15px;
                        margin-left: 10px;
                        width: 15px;

                        &:hover{
                            cursor: pointer;
                        }
                    }

                    span{
                        color: #000;
                        font-size: 2.6rem;
                        margin-left: 10px;
                    } 
                } 

                .ant-row{
                    margin: 0;
                }

                span.error{
                    color: #C0392B;
                    font-size: 1.4rem;
                }
            }

            div.buttons-container{
                width: 40%;
                display: flex;
                margin: 30px auto 0px auto;
                justify-content: space-around;

                button{
                    background: #626567;
                    border: none;
                    border-radius: 2rem;
                    box-sizing: border-box;
                    color: #FFF;
                    font-weight: 600;
                    padding: 0px 20px;
                    
                    &:hover{
                        background: #7B7D7D
                    }

                    svg{
                        font-size: 1.4rem;
                    }
                }

                .cancel{
                    background: #FF0000;

                    &:hover{
                        background: #C0392B;
                    }
                }
            }
        }
    }
`


export const Container = styled.div`

`


