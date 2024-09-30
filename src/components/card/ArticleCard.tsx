import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ArticleEssencial } from "../../types/article-essencial";
import dayjs from "dayjs";
import { CARD_HEIGHT, DATE_FORMAT } from "../../libs/constants";
import { CardActionArea } from "@mui/material";
import ArticleImage from "../../assets/article.png";
import { CheckOutlined } from "@mui/icons-material";

export default function ArticleCard({
  article,
  visited,
  handleClick,
}: {
  article: ArticleEssencial;
  visited: boolean;
  handleClick?: () => void;
}) {
  return (
    <Card sx={{ height: CARD_HEIGHT }}>
      <CardHeader
        // avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
        action={visited && <CheckOutlined />}
        title={
          <Typography variant="subtitle1" noWrap>
            {article.title}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" noWrap>
            {dayjs(article.timestamp).format(DATE_FORMAT)}
          </Typography>
        }
        sx={{ textAlign: "left" }}
      />
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="194"
          image={article.thumbnail?.source ?? ArticleImage}
          alt={article.title}
        />
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "justify",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "6",
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.extract}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
