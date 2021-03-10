import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments }) {
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
            </div>
        )
    }
    return <div />
}


function CampsiteInfo(props) {
    const { campsite } = props;
    if (campsite) {
        return (
            <div className="container">
                <div className="row">
                    <RenderCampsite campsite={campsite} />
                    <RenderComments comments={campsite.comments} />
                </div>
            </div>
        )
    }
    return <div />;
}



export default CampsiteInfo;