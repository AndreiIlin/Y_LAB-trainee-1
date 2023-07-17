import ArticleCard from '@src/components/article-card';
import Head from '@src/components/head';
import PageLayout from '@src/components/page-layout';
import Spinner from '@src/components/spinner';
import LocaleSelect from '@src/containers/locale-select';
import Navigation from '@src/containers/navigation';
import TopHead from '@src/containers/top-head';
import { useAppSelector } from '@src/hooks/use-app-selector';
import { useAppDispatch } from '@src/hooks/use-app-dispatch';
import useInit from '@src/hooks/use-init';
import useStore from '@src/hooks/use-store';
import useTranslate from '@src/hooks/use-translate';
import articleActions from '@src/store-redux/article/actions';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';

function Article() {
  const store = useStore();

  const dispatch = useAppDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    if (params.id) {
      dispatch(articleActions.load(params.id));
    }
  }, [params.id]);

  const select = useAppSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id: string, title: string) => store.actions.basket.addToBasket([{
      _id, title, count: 1,
    }]), [store]),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
