import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

// Estado: variáveis que eu quero que o componmente monitore

// Programação imperativa: O que deve ser feito para o código
// • Receita de bolo:
// -Ligar o forno a 180°;
// - Abrir a porta do forno;

// Programação declarativa: Eu apenas declaro o estado que eu espero. Quais as condições para ter o resultado final
// • Receita de bolo:
// -O forno precisa estar a 180°
// -Quando o forno estiver quente, eu posso colocar a massa para assar;
// -Quando a massa estiver pronta, eu posso retirá-la do forno

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  // const publishedDateFormated = new Intl.DateTimeFormat(`pt-BR`, {
  //   day: "2-digit",
  //   month: "long",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // }).format(publishedAt);

  // A função "setComments" tem o papel de avisar ao ReactJS quando um estado muda, além de alterá-lo
  const [comments, setComments] = useState(["Post muito bacana!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormated = format(
    post.publishedAt,
    "d 'de' LLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    // Imutabilidade: você não passa apenas o que quer inserir, mas também o que já existia antes
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    // Imutabilidade: as variáveis não sofrem mutação. Nunca alteramos uma variável na memória
    // Nos criamos um novo espaço na memória
    // Permite sermos mais perfomáticos
    // É mais fácil para o React criar uma nova variável e comparar com a antiga do que ir diretamente na variável e remover um elemento, adicionar ou alterar

    const commentsWithoutDeletedOne = comments.filter(
      (comment) => comment !== commentToDelete
    );

    setComments(commentsWithoutDeletedOne);
  }

  // Clean Code: facilita a manutenção, tornando a ação mais clara
  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl}></Avatar>
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormated}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content} </p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#" key={line.content}>
                  {line.content}
                </a>{" "}
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder="Deixe um comentário"
          name="comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
          required
          onInvalid={handleNewCommentInvalid}
        ></textarea>

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            ></Comment>
          );
        })}
      </div>
    </article>
  );
}
