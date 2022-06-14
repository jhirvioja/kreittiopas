import * as React from "react";

type PostButtonProps = {
  postType: string;
  postSlug: string;
  postTitle: string;
}

export default function PostButton(props: PostButtonProps): JSX.Element | null {
  if (props.postType === "Podcast") {
    return <>
      <a href={`/post/${props.postSlug}`} className="frontpage-button primary" aria-label={props.postTitle}>
        Avaa jakso
      </a>
      </>;
  } else if (props.postType === "Mainos") {
    return <>
      <a href={`/post/${props.postSlug}`} className="frontpage-button primary" aria-label={props.postTitle}>
        Avaa mainos
      </a>
      </>;
  } else if (props.postType === "Artikkeli") {
    return <>
      <a href={`/post/${props.postSlug}`} className="frontpage-button primary" aria-label={props.postTitle}>
        Avaa artikkeli
      </a>
      </>;
  } else {
    return null;
  }
};