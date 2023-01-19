import React, { useState, useEffect } from "react";

import {Button, Card, CardBody, CardTitle, CardSubtitle,CardText } from "reactstrap";

const IllustDetail = ({ detailItem, detailBox, setDetailBox }) => {
  console.log(detailItem);




  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{detailItem.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {detailItem.title}
        </CardSubtitle>
        <CardText>
            {detailItem.content}
        </CardText>
        <Button onClick={()=>{setDetailBox(!detailBox);}}>확인</Button>
      </CardBody>
    </Card>
  );
};

export default IllustDetail;
