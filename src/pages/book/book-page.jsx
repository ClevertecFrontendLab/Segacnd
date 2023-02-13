import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CatIcon } from '../../assets/icons';
import { Raiting } from '../../components/raiting/raiting-component';
import { OrderButton } from '../../ui/order-button/order-button';

import styles from './book-page.module.css';

export const BookPage = ({ book }) => {
  const navigate = useNavigate();
  const viewType = useSelector((state) => state.viewer.viewType);
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategoryName = categories.find(el => el.name.includes(book.categories))

  const goToSinglePage = (id) => {
    navigate(`/books/${selectedCategoryName.path}/${id}`);
  };
  
  const bookedToDate = book?.booking?.dateOrder.slice(5,10).replace('-', '.') || 0

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
        {book.image?.url ? <img src={`https://strapi.cleverland.by${book.image.url}`} alt='' /> : CatIcon}
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
              <Raiting raiting={book.raiting} />{' '}
            </div>
          ) : (
            'еще нет оценок'
          )}
        </div>
        <div className={styles.buttonWrapper}>
          <OrderButton isOrdered={book?.booking?.order} bookedUntil={bookedToDate}  />
        </div>
      </div>
    </section>
  );
};
