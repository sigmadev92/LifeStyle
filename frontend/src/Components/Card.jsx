import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ImgMediaCard(props) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ maxWidth: 245 }}
      className="h-[300px] w-[200px] transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500"
      onClick={() => {
        console.log("Product detail of : ", props.info._id);
        navigate(`/ProductDetails/${props.info._id}`);
      }}
    >
      {/* PRODUCT Category */}
      <h3 className="text-sm  font-bold p-2 bg-slate-600 text-yellow-200">
        {props.info.ProductCategory}
      </h3>

      <CardMedia
        component="img"
        className="h-[30%] w-[100px]"
        alt="Thumbnail"
        image={`http://localhost:1008/${props.info.ProductCategory}/${props.info.images[1]}`}
      />

      <CardContent>
        {/* Product name  */}
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          className="font-semibold"
        >
          {props.info.Name}
        </Typography>

        {/* Products Rating of product */}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.info.Rating}
        </Typography>

        {/* Products about Item */}
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className="truncate"
        >
          {props.info.AboutItem}
        </Typography>

        {/* Products Price and discount*/}
        <div className="flex flex-col gap-2">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {props.info.Price}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {props.info.Discount}
          </Typography>
        </div>
      </CardContent>

      <CardActions>
        <Button size="small">Like</Button>
        <Button size="small">Add To Cart</Button>
      </CardActions>
    </Card>
  );
}
