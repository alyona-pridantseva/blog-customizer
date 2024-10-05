import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [defaultArticle, setDefaultArticle] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticle.fontFamilyOption.value,
					'--font-size': defaultArticle.fontSizeOption.value,
					'--font-color': defaultArticle.fontColor.value,
					'--container-width': defaultArticle.contentWidth.value,
					'--bg-color': defaultArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultArticle={defaultArticle}
				setDefaultArticle={setDefaultArticle}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
