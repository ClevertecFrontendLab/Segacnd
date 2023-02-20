import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CatIcon } from '../../assets/icons';
import { Raiting } from '../../components/raiting/raiting-component';
import { IBookPreview } from '../../interfases';
import { BASE_URL } from '../../not-env';
import { categoriesSelector, viewerSelector } from '../../redux/selectors';
import { OrderButton } from '../../ui/order-button/order-button';

import styles from './book-page.module.css';

interface IBookPageProps {
  book: IBookPreview;
}

export const BookPage = ({ book }: IBookPageProps) => {
  const navigate = useNavigate();
  const { viewType } = useSelector(viewerSelector);
  const { categories } = useSelector(categoriesSelector);

  const selectedCategoryName = categories.find((el) => book.categories.includes(el.name));
  const bookedToDate = book?.booking?.dateOrder.slice(5, 10).replace('-', '.') || 0;

  const goToSinglePage = (id: number) => {
    if (!selectedCategoryName) {
      return;
    }

    navigate(`/books/${selectedCategoryName.path}/${id}`);
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
          <span>{book.title}</span>
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
