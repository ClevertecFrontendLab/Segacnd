import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { ListArrowIcon } from '../../assets/icons';
import { BookImageSlider } from '../../components/book-image-slider';
import { useEffectOnce } from '../../hooks/use-effect-once-hook';
import { ICategories } from '../../interfases';
import { categoriesSelector, oneBookSelector, viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getSingleBookActions } from '../../redux/slices/get-single-book';
import { OrderButton } from '../../ui/order-button/order-button';
import { Raiting } from '../../ui/raiting/raiting-component';
import { Review } from '../../ui/review/review';

import styles from './single-page.module.css';

export const SinglePage = () => {
  const { bookId, category } = useParams();
  const { commentsState } = useSelector(viewerSelector);
  const { book } = useSelector(oneBookSelector);
  const { categories } = useSelector(categoriesSelector);
  const dispatch = useDispatch();

  const selectedCategoryName = (): ICategories | undefined => {
    if (category && category === 'all') {
      return { id: 0, path: 'all', name: 'Все книги' };
    }

    return categories.find((el) => el.path === category);
  };

  
  function changecommentsState() {
    dispatch(viewTypeActions.commentToggle(!commentsState));
  }
 // Use this effect for develop to avoid problem with double call in strict mode 
  useEffectOnce(() => {
    if (bookId) {
      dispatch(getSingleBookActions.startFetchingOneBook(+bookId));
    }
  });
 // Use this effect for prod
  // useEffect(() => {
  //   if (bookId) {
  //     dispatch(getSingleBookActions.startFetchingOneBook(+bookId));
  //   }
  // }, [bookId, dispatch]);

  const bookedToDate = book?.booking?.dateOrder.slice(5, 10).replace('-', '.') || 0;

  return (
    <div>
      <div className={styles.crumb}>
        <Link data-test-id='breadcrumbs-link' to={`/books/${selectedCategoryName()?.path}`}>
          {selectedCategoryName()?.name}
        </Link>
        <b>/</b> <span data-test-id='book-name'>{book?.title || ''}</span>
      </div>

      {book && (
        <React.Fragment>
          <div className={styles.aboutWrapper}>
            <div
              className={` ${styles.image} ${styles.bookCoverWrapper} ${
                !book.images || book.images.length < 2 ? styles.withoutImageSlider : ''
              }`}
            >
              <BookImageSlider images={book.images} />
            </div>

            <h3 data-test-id='book-title' className={styles.title}>
              {book.title}
            </h3>
            <h5 className={`${styles.author} ${styles.bookAuthor}`}>
              {book.authors}, {book.issueYear}
            </h5>
            <div className={`${styles.button} ${styles.buttonWrapper}`}>
              <OrderButton isOrdered={book?.booking?.order} bookedUntil={bookedToDate} />
            </div>

            <p className={`${styles.description} ${styles.bookDescription}`}>
              <span className={styles.subTitle}>О книге</span>
              {book.description}
            </p>
          </div>
          <div className={styles.additionlDetailsWrapper}>
            <h5>Рейтинг</h5>
            <hr className={styles.line} />
            <div className={styles.raitingWrapper}>
              <div className={styles.raiting}>
                {book.rating ? (
                  <React.Fragment>
                    <Raiting rating={book.rating} />
                    <span>{book.rating}</span>
                  </React.Fragment>
                ) : (
                  'еще нет оценок'
                )}
              </div>
            </div>
            <h5>Подробная информация</h5>
            <hr className={styles.line} />

            <div className={styles.detailedInfo}>
              <table>
                <tbody>
                  <tr>
                    <td>Издательство</td>
                    <td>{book.publish}</td>
                  </tr>

                  <tr>
                    <td>Год издания</td>
                    <td>{book.issueYear}</td>
                  </tr>

                  <tr>
                    <td>Страниц</td>
                    <td>{book.pages}</td>
                  </tr>

                  <tr>
                    <td>Переплёт</td>
                    <td>{book.cover}</td>
                  </tr>

                  <tr>
                    <td>Формат</td>
                    <td>{book.format}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <tbody>
                  <tr>
                    <td>Жанр</td>
                    <td>{book.categories}</td>
                  </tr>

                  <tr>
                    <td>Вес</td>
                    <td>{book.weight}г.</td>
                  </tr>

                  <tr>
                    <td>ISBN</td>
                    <td>{book.ISBN}</td>
                  </tr>

                  <tr>
                    <td>Изготовитель</td>
                    <td>{book.producer}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.reviews}>
              <h5>
                Отзывы <span className={styles.reviewsCount}>{book?.comments?.length || 0}</span>{' '}
                <button
                  data-test-id='button-hide-reviews'
                  onClick={changecommentsState}
                  className={
                    commentsState ? `${styles.open} ${styles.iconWrapper} ` : `${styles.iconWrapper}  ${styles.close}`
                  }
                  type='button'
                >
                  {ListArrowIcon}
                </button>
              </h5>
              <hr className={styles.line} />
              <div className={styles.reviewWrapper}>
                {commentsState && book.comments?.map((el) => <Review key={el.id} {...el} />)}
              </div>
            </div>

            <div data-test-id='button-rating' className={styles.buttonWrapper}>
              <OrderButton isOrdered={false} inStock={false} content='Оценить книгу' />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
