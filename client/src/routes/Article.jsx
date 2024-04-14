import React, { useEffect, useMemo } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

import { withHistory } from "slate-history";
import Blur from "../components/Blur";
import Button from "../components/Button";
import FormModal from "../components/FormModal";
import { API_URL, DEFAULT_COVER_PHOTO } from "../constants";
import { useEditor } from "../contexts/EditorProvider";
import "../styles/Article.css";
import { formatDate } from "../utils";

const Article = () => {
  return (
    <div className="article">
      <div className="article__header">
        <p className="article__header__date">Date</p>
        <h1>Title</h1>
        <p className="article__header__author">By: Author</p>
      </div>
      <img className="article__cover-photo" src="" />
      <Button variant="primary">
        Edit Article
      </Button>
      <div>Content</div>
    </div>
  );
};

export default Article;