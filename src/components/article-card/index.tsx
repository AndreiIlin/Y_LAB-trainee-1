import { cn as bem } from '@bem-react/classname';
import { Text } from '@src/i18n/types';
import { IArticle } from '@src/store-redux/article/types';
import numberFormat from '@src/utils/number-format';
import { memo } from 'react';
import './style.css';

interface ArticleCardProps {
  article: IArticle;
  onAdd: (_id: string, title: string) => Promise<void>;
  t: (text: Text, number?: number) => string;
}

function ArticleCard({
                       article,
                       onAdd,
                       t,
                     }: ArticleCardProps) {
  const cn = bem('ArticleCard');
  return (
    <div className={cn()}>
      <div className={cn('description')}>{article.description}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Страна производитель:</div>
        <div className={cn('value')}>{article.madeIn?.title} ({article.madeIn?.code})</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Категория:</div>
        <div className={cn('value')}>{article.category?.title}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Год выпуска:</div>
        <div className={cn('value')}>{article.edition}</div>
      </div>
      <div className={cn('prop', { size: 'big' })}>
        <div className={cn('label')}>Цена:</div>
        <div className={cn('value')}>{numberFormat(article.price)} ₽</div>
      </div>
      <button onClick={() => onAdd(article._id, article.title)}>{t('article.add')}</button>
    </div>
  );
}

ArticleCard.defaultProps = {
  onAdd: () => {
  },
  t: (text: Text) => text,
};

export default memo(ArticleCard);
