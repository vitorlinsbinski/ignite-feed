import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";
import { useState } from "react";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount((prevLikeCount) => {
      return prevLikeCount + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar src="https://github.com/diego3g.png" hasBorder={false} alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>

              <time title="11 de Maio às 08:13" dateTime="2022-05-11 08:13:30">
                Cerca de 1h atrás
              </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24}></Trash>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          {/* Quando acontecer um evento, não se pode executar a função, mas sim referenciá-la */}
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20}></ThumbsUp>Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
