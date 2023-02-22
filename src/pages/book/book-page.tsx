import { useNavigate } from 'react-router-dom';

import { CatIcon } from '../../assets/icons';
import { IBookPreview } from '../../interfases';
import { BASE_URL } from '../../not-env';
import { viewerSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import { OrderButton } from '../../ui/order-button/order-button';
import { Raiting } from '../../ui/raiting/raiting-component';

import { Higlight } from './highlight';

import styles from './book-page.module.css';

interface IBookPageProps {
  book: IBookPreview;
  currentCategory: string | undefined;
}

export const BookPage = ({ book, currentCategory }: IBookPageProps) => {
  const navigate = useNavigate();
  const { viewType } = useAppSelector(viewerSelector);

  const bookedToDate = book?.booking?.dateOrder.slice(5, 10).replace('-', '.') || 0;

  const goToSinglePage = (id: number) => {
    if (!currentCategory) {
      return;
    }

    navigate(`/books/${currentCategory}/${id}`);
  };

  return (
    <section
      data-test-id='card'
      className={viewType === 'grid' ? `${styles.bookPageSmall}` : `${styles.bookPageBig}`}
      onClick={() => {
        goToSinglePage(book.id);
      }}
      aria-hidden='true'
    >
      <div className={styles.imgWrapper}>
        {book.image?.url ? <img src={`${BASE_URL}${book.image.url}`} alt='' /> : CatIcon}
      </div>

      <div className={styles.infoWrapper}>
        <div className={`${styles.title}`}>
          <p>
            <Higlight text={book.title} />
          </p>
        </div>

        <div className={styles.author}>
          {book.authors.map((el) => (
            <span className={styles.authorName} key={el}>
              {el}
            </span>
          ))}
          <span>{book.issueYear}</span>
        </div>

        <div className={styles.raiting}>
          {book.rating ? (
            <div>
              {' '}
              <Raiting rating={book.rating} />{' '}
            </div>
          ) : (
            'еще нет оценок'
          )}
        </div>
        <div className={styles.buttonWrapper}>
          <OrderButton isOrdered={book?.booking?.order} bookedUntil={bookedToDate} />
        </div>
      </div>
    </section>
  );
};
