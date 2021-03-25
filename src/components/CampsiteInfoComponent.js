import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const required = val => val;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments, postComment, campsiteId }) {
    console.log(comments)
    if (comments) {
        return (
            <div className="col-md-5 m-4">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div className="mb-2" key={comment.id}>
                            <div>{comment.text}</div>
                            <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
                                .format(new Date(Date.parse(comment.date)))}</div>
                        </div>
                    )
                })
                }
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        )
    }
    return <div />
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" />
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating" >rating</Label>
                                <Control.select
                                    model=".rating"
                                    id="rating"
                                    name="rating"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author" >Your Name</Label>
                                <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Mist be 15 characters or less'
                                    }}
                                />

                            </div>
                            <div className="form-group">
                                <Label htmlFor="text" >Comment</Label>
                                <Control.textarea
                                    model=".text"
                                    id="text"
                                    name="text"
                                    rows="6"
                                    className="form-control"
                                />
                            </div>
                            <Button type="submit" value="submit" color="primary" >Submit</Button>

                        </LocalForm>
                    </ModalBody>
                </Modal>

            </>

        )
    }
}


function CampsiteInfo(props) {
    const { campsite, comments, isLoading, errMess } = props;

    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    };

    if (errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    };

    if (campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={campsite} />
                    <RenderComments
                        comments={comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />

                </div>

            </div>
        )
    }
    return <div />;
}



export default CampsiteInfo;