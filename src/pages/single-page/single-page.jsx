import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { ListArrowIcon } from '../../assets/icons';
import { BookImageSlider } from '../../components/book-image-slider';
import { ErrorComponent } from '../../components/error/error-component';
import { LoaderComponent } from '../../components/loader/loader';
import { Raiting } from '../../components/raiting/raiting-component';
import { Review } from '../../components/review/review';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getSingleBookActions } from '../../redux/slices/get-single-book';
import { OrderButton } from '../../ui/order-button/order-button';

import styles from './single-page.module.css';

export const SinglePage = () => {
  const status = useSelector((state) => state.oneBook.status);
  const { bookId, category } = useParams();
  const commentState = useSelector((state) => state.viewer.commentsState);
  const currentBook = useSelector((state) => state.oneBook.book);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategoryName = categories.find((el) => el.path === category);

  function changecommentState() {
    dispatch(viewTypeActions.commentToggle(!commentState));
  }

  useEffect(() => {
    dispatch(getSingleBookActions.startFetchingOneBook(+bookId));
  }, [bookId, dispatch]);

  const bookedToDate = currentBook?.booking?.dateOrder.slice(5, 10).replace('-', '.') || 0;

  if (status === 'loading') {
    return <LoaderComponent />;
  }

  if (status === 'error') {
    return <ErrorComponent />;
  }

  return (
    <div>
      <div className={styles.crumb}>
        <Link to={`/books/${selectedCategoryName?.path}`}> {currentBook.categories} </Link> <b>/</b> {currentBook.title}
      </div>

      <div className={styles.aboutWrapper}>
        <div
          className={` ${styles.image} ${styles.bookCoverWrapper} ${
            !currentBook.images || currentBook.images.length < 2 ? styles.withoutImageSlider : ''
          }`}
        >
          <BookImageSlider images={currentBook.images} />
        </div>

        <h3 className={styles.title}>{currentBook.title}</h3>
        <h5 className={`${styles.author} ${styles.bookAuthor}`}>
          {currentBook.authors}, {currentBook.issueYear}
        </h5>
        <div className={`${styles.button} ${styles.buttonWrapper}`}>
          <OrderButton isOrdered={currentBook?.booking?.order} bookedUntil={bookedToDate} />
        </div>

        <p className={`${styles.description} ${styles.bookDescription}`}>
          <span className={styles.subTitle}>О книге</span>
          {currentBook.description}
        </p>
      </div>

      <div className={styles.additionlDetailsWrapper}>
        <h5>Рейтинг</h5>
        <hr className={styles.line} />
        <div className={styles.raitingWrapper}>
          <div className={styles.raiting}>
            {currentBook.rating ? (
              <React.Fragment>
                <Raiting raiting={currentBook.raiting} />
                <span>{currentBook.rating}</span>
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
                <td>{currentBook.publish}</td>
              </tr>

              <tr>
                <td>Год издания</td>
                <td>{currentBook.issueYear}</td>
              </tr>

              <tr>
                <td>Страниц</td>
                <td>{currentBook.pages}</td>
              </tr>

              <tr>
                <td>Переплёт</td>
                <td>{currentBook.cover}</td>
              </tr>

              <tr>
                <td>Формат</td>
                <td>{currentBook.format}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Жанр</td>
                <td>{currentBook.categories}</td>
              </tr>

              <tr>
                <td>Вес</td>
                <td>{currentBook.weight}г.</td>
              </tr>

              <tr>
                <td>ISBN</td>
                <td>{currentBook.ISBN}</td>
              </tr>

              <tr>
                <td>Изготовитель</td>
                <td>{currentBook.producer}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.reviews}>
          <h5>
            Отзывы <span className={styles.reviewsCount}>{currentBook?.comments?.length || 0}</span>{' '}
            <button
              data-test-id='button-hide-reviews'
              onClick={changecommentState}
              className={
                commentState ? `${styles.open} ${styles.iconWrapper} ` : `${styles.iconWrapper}  ${styles.close}`
              }
              type='button'
            >
              {ListArrowIcon}
            </button>
          </h5>
          <hr className={styles.line} />
          <div className={styles.reviewWrapper}>
            {commentState && currentBook.comments?.map((el) => <Review key={el.id} {...el} />)}
          </div>
        </div>

        <div data-test-id='button-rating' className={styles.buttonWrapper}>
          <OrderButton isOrdered={false} inStock={false} content='Оценить книгу' />
        </div>
      </div>
    </div>
  );
};
